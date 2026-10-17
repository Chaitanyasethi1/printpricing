using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace ASPrintGallery
{
    static class Program
    {
        private static HttpListener _listener;
        private static string _appDir;

        [STAThread]
        static void Main()
        {
            try
            {
                // 1. Resolve Application Directory
                _appDir = AppDomain.CurrentDomain.BaseDirectory;
                if (!File.Exists(Path.Combine(_appDir, "index.html")))
                {
                    string fallback = @"c:\Users\Chait\OneDrive\Desktop\printpricing";
                    if (File.Exists(Path.Combine(fallback, "index.html")))
                    {
                        _appDir = fallback;
                    }
                }

                if (!File.Exists(Path.Combine(_appDir, "index.html")))
                {
                    MessageBox.Show(
                        "index.html not found! Please place AS_Print_Gallery.exe inside the printpricing folder.",
                        "AS Print Gallery",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                    return;
                }

                // 2. Find a free TCP port
                int port = GetFreePort();

                // 3. Start Local HTTP Server
                _listener = new HttpListener();
                _listener.Prefixes.Add("http://127.0.0.1:" + port + "/");
                _listener.Start();

                Thread serverThread = new Thread(RunServer);
                serverThread.IsBackground = true;
                serverThread.Start();

                // 4. Find Browser Executable (Edge or Chrome)
                string browserPath = FindBrowser();
                string appUrl = "http://127.0.0.1:" + port + "/index.html";

                // Isolated user data directory for local database persistence
                string dataDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                    "AS_Print_Gallery",
                    "UserData"
                );
                Directory.CreateDirectory(dataDir);

                Process browserProc = null;

                if (!string.IsNullOrEmpty(browserPath))
                {
                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = browserPath,
                        Arguments = string.Format(
                            "--app=\"{0}\" --window-size=1380,920 --user-data-dir=\"{1}\" --enable-features=msEdgeAppTitlebar",
                            appUrl,
                            dataDir
                        ),
                        UseShellExecute = false
                    };
                    browserProc = Process.Start(psi);
                }
                else
                {
                    // Fallback to default browser
                    Process.Start(appUrl);
                }

                if (browserProc != null)
                {
                    browserProc.WaitForExit();
                }
                else
                {
                    // If no direct process handle, keep server alive for session
                    Thread.Sleep(3000);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error launching AS Print Gallery:\n" + ex.Message,
                    "AS Print Gallery",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning
                );
            }
            finally
            {
                if (_listener != null && _listener.IsListening)
                {
                    try { _listener.Stop(); } catch { }
                }
            }
        }

        private static int GetFreePort()
        {
            TcpListener l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();
            int port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port;
        }

        private static string FindBrowser()
        {
            string[] paths = new string[]
            {
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Google\Chrome\Application\chrome.exe")
            };

            foreach (string p in paths)
            {
                if (File.Exists(p)) return p;
            }

            return null;
        }

        private static void RunServer()
        {
            while (_listener != null && _listener.IsListening)
            {
                try
                {
                    HttpListenerContext context = _listener.GetContext();
                    ThreadPool.QueueUserWorkItem((state) => HandleRequest(context));
                }
                catch
                {
                    break;
                }
            }
        }

        private static void HandleRequest(HttpListenerContext context)
        {
            try
            {
                string rawUrl = context.Request.Url.AbsolutePath;
                if (rawUrl == "/" || string.IsNullOrEmpty(rawUrl))
                {
                    rawUrl = "/index.html";
                }

                rawUrl = rawUrl.Replace('/', Path.DirectorySeparatorChar).TrimStart(Path.DirectorySeparatorChar);
                string filePath = Path.Combine(_appDir, rawUrl);

                if (!File.Exists(filePath))
                {
                    context.Response.StatusCode = 404;
                    byte[] notFound = Encoding.UTF8.GetBytes("File Not Found");
                    context.Response.OutputStream.Write(notFound, 0, notFound.Length);
                    context.Response.Close();
                    return;
                }

                string ext = Path.GetExtension(filePath).ToLower();
                string mime = "application/octet-stream";
                switch (ext)
                {
                    case ".html": mime = "text/html; charset=utf-8"; break;
                    case ".css":  mime = "text/css; charset=utf-8"; break;
                    case ".js":   mime = "application/javascript; charset=utf-8"; break;
                    case ".png":  mime = "image/png"; break;
                    case ".jpg":
                    case ".jpeg": mime = "image/jpeg"; break;
                    case ".svg":  mime = "image/svg+xml"; break;
                    case ".ico":  mime = "image/x-icon"; break;
                    case ".json": mime = "application/json; charset=utf-8"; break;
                    case ".woff": mime = "font/woff"; break;
                    case ".woff2": mime = "font/woff2"; break;
                    case ".ttf":  mime = "font/ttf"; break;
                }

                byte[] data = File.ReadAllBytes(filePath);
                context.Response.ContentType = mime;
                context.Response.ContentLength64 = data.Length;
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
                context.Response.OutputStream.Write(data, 0, data.Length);
                context.Response.Close();
            }
            catch
            {
                try { context.Response.Close(); } catch { }
            }
        }
    }
}
