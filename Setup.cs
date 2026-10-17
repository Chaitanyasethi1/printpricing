using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Win32;

namespace ASPrintGalleryInstaller
{
    public class SetupForm : Form
    {
        private TextBox txtInstallPath;
        private CheckBox chkDesktop;
        private CheckBox chkStartMenu;
        private CheckBox chkLaunchNow;
        private ProgressBar prgBar;
        private Label lblStatus;
        private Button btnAction;
        private Button btnCancel;
        private Panel headerPanel;
        private Label lblHeaderTitle;
        private Label lblHeaderSub;
        private bool isFinished = false;

        public SetupForm()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this.Text = "AS Print Gallery Setup";
            this.Size = new Size(540, 420);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.BackColor = Color.FromArgb(248, 250, 252);
            this.Font = new Font("Segoe UI", 9.25f, FontStyle.Regular);

            try
            {
                string icoPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "app.ico");
                if (File.Exists(icoPath)) this.Icon = new Icon(icoPath);
            }
            catch { }

            // Header Banner
            headerPanel = new Panel();
            headerPanel.Dock = DockStyle.Top;
            headerPanel.Height = 85;
            headerPanel.BackColor = Color.FromArgb(30, 58, 138);

            lblHeaderTitle = new Label();
            lblHeaderTitle.Text = "AS Print Gallery - Installation Wizard";
            lblHeaderTitle.Font = new Font("Segoe UI", 13.5f, FontStyle.Bold);
            lblHeaderTitle.ForeColor = Color.White;
            lblHeaderTitle.Location = new Point(20, 16);
            lblHeaderTitle.AutoSize = true;

            lblHeaderSub = new Label();
            lblHeaderSub.Text = "Packaging, Quotation & Invoicing Studio for Windows";
            lblHeaderSub.Font = new Font("Segoe UI", 9.25f, FontStyle.Regular);
            lblHeaderSub.ForeColor = Color.FromArgb(219, 234, 254);
            lblHeaderSub.Location = new Point(22, 48);
            lblHeaderSub.AutoSize = true;

            headerPanel.Controls.Add(lblHeaderTitle);
            headerPanel.Controls.Add(lblHeaderSub);
            this.Controls.Add(headerPanel);

            // Install Path Label & Box
            Label lblPath = new Label();
            lblPath.Text = "Destination Folder:";
            lblPath.Location = new Point(24, 105);
            lblPath.AutoSize = true;
            lblPath.Font = new Font("Segoe UI", 9.25f, FontStyle.Bold);
            this.Controls.Add(lblPath);

            string defaultPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                @"Programs\AS_Print_Gallery"
            );

            txtInstallPath = new TextBox();
            txtInstallPath.Text = defaultPath;
            txtInstallPath.Location = new Point(24, 130);
            txtInstallPath.Size = new Size(475, 26);
            txtInstallPath.ReadOnly = true;
            txtInstallPath.BackColor = Color.White;
            this.Controls.Add(txtInstallPath);

            // Options Checkboxes
            chkDesktop = new CheckBox();
            chkDesktop.Text = "Create Desktop Shortcut (Recommended)";
            chkDesktop.Location = new Point(24, 175);
            chkDesktop.Size = new Size(350, 24);
            chkDesktop.Checked = true;
            this.Controls.Add(chkDesktop);

            chkStartMenu = new CheckBox();
            chkStartMenu.Text = "Create Start Menu Program Entry";
            chkStartMenu.Location = new Point(24, 205);
            chkStartMenu.Size = new Size(350, 24);
            chkStartMenu.Checked = true;
            this.Controls.Add(chkStartMenu);

            chkLaunchNow = new CheckBox();
            chkLaunchNow.Text = "Launch AS Print Gallery after setup";
            chkLaunchNow.Location = new Point(24, 235);
            chkLaunchNow.Size = new Size(350, 24);
            chkLaunchNow.Checked = true;
            this.Controls.Add(chkLaunchNow);

            // Progress Bar & Status Label
            lblStatus = new Label();
            lblStatus.Text = "Click Install to begin setup.";
            lblStatus.Location = new Point(24, 275);
            lblStatus.Size = new Size(475, 20);
            lblStatus.ForeColor = Color.FromArgb(71, 85, 105);
            this.Controls.Add(lblStatus);

            prgBar = new ProgressBar();
            prgBar.Location = new Point(24, 300);
            prgBar.Size = new Size(475, 20);
            prgBar.Style = ProgressBarStyle.Continuous;
            this.Controls.Add(prgBar);

            // Bottom Separator Line
            Panel sep = new Panel();
            sep.Location = new Point(0, 332);
            sep.Size = new Size(540, 1);
            sep.BackColor = Color.FromArgb(226, 232, 240);
            this.Controls.Add(sep);

            // Buttons
            btnAction = new Button();
            btnAction.Text = "Install";
            btnAction.Location = new Point(310, 345);
            btnAction.Size = new Size(95, 30);
            btnAction.BackColor = Color.FromArgb(37, 99, 235);
            btnAction.ForeColor = Color.White;
            btnAction.FlatStyle = FlatStyle.Flat;
            btnAction.FlatAppearance.BorderSize = 0;
            btnAction.Cursor = Cursors.Hand;
            btnAction.Click += BtnAction_Click;
            this.Controls.Add(btnAction);

            btnCancel = new Button();
            btnCancel.Text = "Cancel";
            btnCancel.Location = new Point(415, 345);
            btnCancel.Size = new Size(85, 30);
            btnCancel.BackColor = Color.White;
            btnCancel.FlatStyle = FlatStyle.Flat;
            btnCancel.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnCancel.Click += (s, e) => { this.Close(); };
            this.Controls.Add(btnCancel);
        }

        private void BtnAction_Click(object sender, EventArgs e)
        {
            if (isFinished)
            {
                if (chkLaunchNow.Checked)
                {
                    string exePath = Path.Combine(txtInstallPath.Text, "AS_Print_Gallery.exe");
                    if (File.Exists(exePath))
                    {
                        Process.Start(new ProcessStartInfo { FileName = exePath, UseShellExecute = true });
                    }
                }
                this.Close();
                return;
            }

            // Perform Installation
            btnAction.Enabled = false;
            btnCancel.Enabled = false;
            chkDesktop.Enabled = false;
            chkStartMenu.Enabled = false;

            lblStatus.Text = "Extracting files to destination...";
            prgBar.Value = 25;
            Application.DoEvents();

            try
            {
                string targetDir = txtInstallPath.Text;
                if (!Directory.Exists(targetDir))
                {
                    Directory.CreateDirectory(targetDir);
                }

                // 1. Extract payload.zip from embedded resource
                Assembly asm = Assembly.GetExecutingAssembly();
                using (Stream resStream = asm.GetManifestResourceStream("payload.zip"))
                {
                    if (resStream == null)
                    {
                        // Fallback: look for payload.zip in current dir
                        string localZip = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "payload.zip");
                        if (File.Exists(localZip))
                        {
                            using (FileStream fs = File.OpenRead(localZip))
                            {
                                ExtractZipStream(fs, targetDir);
                            }
                        }
                        else
                        {
                            throw new Exception("Installer payload package not found!");
                        }
                    }
                    else
                    {
                        ExtractZipStream(resStream, targetDir);
                    }
                }

                prgBar.Value = 70;
                lblStatus.Text = "Creating shortcuts and registering application...";
                Application.DoEvents();

                string exePath = Path.Combine(targetDir, "AS_Print_Gallery.exe");
                string icoPath = Path.Combine(targetDir, "app.ico");

                // 2. Create Desktop Shortcut
                if (chkDesktop.Checked)
                {
                    string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
                    string lnkFile = Path.Combine(desktopPath, "AS Print Gallery.lnk");
                    CreateShortcut(lnkFile, exePath, targetDir, icoPath, "AS Print Gallery Studio");
                }

                // 3. Create Start Menu Shortcut
                if (chkStartMenu.Checked)
                {
                    string startMenu = Environment.GetFolderPath(Environment.SpecialFolder.Programs);
                    string lnkFile = Path.Combine(startMenu, "AS Print Gallery.lnk");
                    CreateShortcut(lnkFile, exePath, targetDir, icoPath, "AS Print Gallery Studio");
                }

                // 4. Register in Windows Add/Remove Programs
                try
                {
                    string uninstExe = Path.Combine(targetDir, "Uninstall.exe");
                    using (RegistryKey key = Registry.CurrentUser.CreateSubKey(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\AS_Print_Gallery"))
                    {
                        if (key != null)
                        {
                            key.SetValue("DisplayName", "AS Print Gallery");
                            key.SetValue("DisplayVersion", "1.0.0");
                            key.SetValue("Publisher", "AS Print Gallery");
                            key.SetValue("DisplayIcon", icoPath);
                            key.SetValue("InstallLocation", targetDir);
                            key.SetValue("UninstallString", "\"" + uninstExe + "\"");
                            key.SetValue("NoModify", 1, RegistryValueKind.DWord);
                            key.SetValue("NoRepair", 1, RegistryValueKind.DWord);
                        }
                    }
                }
                catch { }

                prgBar.Value = 100;
                lblStatus.Text = "Installation completed successfully!";
                lblStatus.ForeColor = Color.FromArgb(22, 101, 52);

                isFinished = true;
                btnAction.Text = "Finish";
                btnAction.Enabled = true;
                btnCancel.Visible = false;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Installation Error:\n" + ex.Message, "Setup Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                btnAction.Enabled = true;
                btnCancel.Enabled = true;
                lblStatus.Text = "Installation failed.";
            }
        }

        private void ExtractZipStream(Stream zipStream, string targetDir)
        {
            using (ZipArchive archive = new ZipArchive(zipStream, ZipArchiveMode.Read))
            {
                foreach (ZipArchiveEntry entry in archive.Entries)
                {
                    string destinationPath = Path.GetFullPath(Path.Combine(targetDir, entry.FullName));
                    if (entry.FullName.EndsWith("/") || entry.FullName.EndsWith("\\"))
                    {
                        Directory.CreateDirectory(destinationPath);
                        continue;
                    }

                    string dir = Path.GetDirectoryName(destinationPath);
                    if (!Directory.Exists(dir))
                    {
                        Directory.CreateDirectory(dir);
                    }

                    entry.ExtractToFile(destinationPath, true);
                }
            }
        }

        private void CreateShortcut(string shortcutPath, string targetPath, string workingDir, string iconPath, string desc)
        {
            try
            {
                Type shellType = Type.GetTypeFromProgID("WScript.Shell");
                dynamic shell = Activator.CreateInstance(shellType);
                dynamic shortcut = shell.CreateShortcut(shortcutPath);
                shortcut.TargetPath = targetPath;
                shortcut.WorkingDirectory = workingDir;
                shortcut.Description = desc;
                if (File.Exists(iconPath))
                {
                    shortcut.IconLocation = iconPath + ",0";
                }
                shortcut.Save();
            }
            catch { }
        }

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new SetupForm());
        }
    }
}
