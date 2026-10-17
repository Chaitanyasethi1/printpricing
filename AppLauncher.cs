using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace ASPrintGallery
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                // Resolve application directory
                string appDir = AppDomain.CurrentDomain.BaseDirectory;
                string htmlFile = Path.Combine(appDir, "index.html");

                if (!File.Exists(htmlFile))
                {
                    string installFallback = Path.Combine(
                        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                        @"Programs\AS_Print_Gallery\index.html"
                    );
                    if (File.Exists(installFallback))
                    {
                        htmlFile = installFallback;
                    }
                    else
                    {
                        string desktopFallback = @"c:\Users\Chait\OneDrive\Desktop\printpricing\index.html";
                        if (File.Exists(desktopFallback))
                        {
                            htmlFile = desktopFallback;
                        }
                    }
                }

                if (!File.Exists(htmlFile))
                {
                    MessageBox.Show(
                        "Application files not found!\nPlease run AS_Print_Gallery_Setup.exe to install.",
                        "AS Print Gallery",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                    return;
                }

                string fileUri = "file:///" + htmlFile.Replace('\\', '/');

                // Dedicated isolated user data directory for local storage
                string userDataDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                    "AS_Print_Gallery",
                    "Profile"
                );
                Directory.CreateDirectory(userDataDir);

                string browser = FindBrowser();

                if (!string.IsNullOrEmpty(browser))
                {
                    string args = string.Format(
                        "--app=\"{0}\" --window-size=1380,920 --user-data-dir=\"{1}\" --enable-features=msEdgeAppTitlebar",
                        fileUri,
                        userDataDir
                    );

                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = browser,
                        Arguments = args,
                        UseShellExecute = false
                    };
                    Process.Start(psi);
                }
                else
                {
                    Process.Start(new ProcessStartInfo
                    {
                        FileName = fileUri,
                        UseShellExecute = true
                    });
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error starting application:\n" + ex.Message,
                    "AS Print Gallery",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
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
    }
}
