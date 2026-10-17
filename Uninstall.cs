using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;
using Microsoft.Win32;

namespace ASPrintGalleryInstaller
{
    static class Uninstaller
    {
        [STAThread]
        static void Main()
        {
            DialogResult res = MessageBox.Show(
                "Are you sure you want to uninstall AS Print Gallery from your computer?",
                "AS Print Gallery Uninstall",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question
            );

            if (res != DialogResult.Yes) return;

            try
            {
                // 1. Remove Desktop Shortcut
                string desktopLnk = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory),
                    "AS Print Gallery.lnk"
                );
                if (File.Exists(desktopLnk)) File.Delete(desktopLnk);

                // 2. Remove Start Menu Shortcut
                string startMenuLnk = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.Programs),
                    "AS Print Gallery.lnk"
                );
                if (File.Exists(startMenuLnk)) File.Delete(startMenuLnk);

                // 3. Remove Registry Uninstall Key
                try
                {
                    Registry.CurrentUser.DeleteSubKeyTree(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\AS_Print_Gallery", false);
                }
                catch { }

                // 4. Schedule directory removal via background cmd
                string appDir = AppDomain.CurrentDomain.BaseDirectory.TrimEnd('\\');
                ProcessStartInfo psi = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = string.Format("/C timeout /t 1 /nobreak > nul & rmdir /S /Q \"{0}\"", appDir),
                    WindowStyle = ProcessWindowStyle.Hidden,
                    CreateNoWindow = true
                };
                Process.Start(psi);

                MessageBox.Show(
                    "AS Print Gallery has been successfully removed from your computer.",
                    "Uninstall Complete",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information
                );
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error during uninstall: " + ex.Message, "Uninstall Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
