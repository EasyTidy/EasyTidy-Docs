---
title: Cloud Storage
description: Configure WebDAV, S3-compatible storage, Baidu Netdisk, and 123 Cloud, then upload or retrieve files in organization tasks.
---

EasyTidy Pro can use cloud storage as a destination or source for organization tasks, and some storage services can also be mounted as Windows drive letters. All entries are located on the **Integrations** page; once configured, choose **Cloud Storage Transfer** when creating or editing a rule.

![Cloud Storage Integrations overview](/images/zh/cloud-storage-integrations-overview.png)

## Supported Services

| Type | Upload / Retrieve | Multiple Configs | Drive Mount | App Backup |
| --- | :---: | :---: | :---: | :---: |
| WebDAV | Yes | Yes | Yes | Yes |
| S3-Compatible | Yes | Yes | Yes | No |
| Baidu Netdisk | Yes | Yes | No | No |
| 123 Cloud | Yes | Yes | Not yet | No |

::::note
"App backup" refers to backing up EasyTidy Pro configuration and data, not arbitrary files. Remote app backup currently supports only WebDAV.
::::

## WebDAV

WebDAV serves two purposes:

- **File organization uploads**: Add multiple accounts, set aliases and a default account, and optionally mount as a drive letter.
- **App backup**: Configure a separate backup endpoint for manual/automatic backup and restore.

When adding a file organization account, fill in the server URL, port, username, password, and remote path. The URL must start with `http://` or `https://`; the remote path should use a root-relative path such as `/EasyTidyPro_UploadFiles`.

![WebDAV upload account configuration](/images/zh/cloud-storage-webdav-account.png)

Even if the same service is used for both organization uploads and app backups, it is still recommended to use different remote directories for each purpose to avoid mixing regular files with backup archives.

### WebDAV App Backup

1. Configure the account and remote path under **Integrations → WebDAV → App Backup**.
2. Go to **Settings → General → Backup Settings** and select WebDAV.
3. Run a backup immediately, or enable automatic backup with a custom interval and retention limit.
4. When restoring, the app lists available backups on the remote by time; select a version and proceed.

![Selecting a WebDAV backup version](/images/zh/cloud-storage-webdav-restore-version.webp)

Restoring overwrites the current application data. Consider creating a local backup first, and confirm the source and timestamp of the remote backup.

## S3-Compatible Storage

S3 integration supports multiple bucket configurations with a default selection. The following service types are currently available:

- Generic S3-compatible services, such as AWS S3;
- Qiniu Cloud Storage;
- Tencent Cloud COS;
- Self-hosted S3-compatible services, such as OpenList, MinIO, and Garage.

Typical required fields:

- **Access Key / Secret Key**: Credentials provided by your storage service;
- **Bucket**: Bucket name;
- **Region**: Defaults to `us-east-1` when the provider has no specific requirement;
- **Endpoint**: The S3 API address for third-party or self-hosted services; can usually be left blank for AWS S3;
- **Path Prefix**: The target directory within the bucket.

Use the S3 API endpoint, not the object storage console URL or a public download domain. It is recommended to grant credentials only the list, read, write, and delete permissions needed for the target bucket.

![S3 bucket configuration](/images/zh/cloud-storage-s3-bucket.png)

## Baidu Netdisk

Baidu Netdisk integration uses Open Platform application credentials and account authorization. You can save multiple configurations and designate a default account. When configuring, prepare your `App Key` and `Secret Key`, then follow the on-screen prompts to complete account authorization; the path prefix specifies the target location under the application directory.

Authorization tokens may expire or be revoked. If authentication fails, return to the Integrations page to re-authorize before testing the task.

![Baidu Netdisk authorization and path configuration](/images/zh/cloud-storage-baidu-authorization.png)

## 123 Cloud

::::caution[You must provide your own Key]
The 123 Cloud integration does not provide a public Key. You must apply for an application on the **123 Cloud Open Platform** yourself and obtain a `Client ID` and `Client Secret` before using this feature. EasyTidy Pro does not embed, share, or apply for these credentials on your behalf.
::::

Configuration steps:

1. Create an application on the 123 Cloud Open Platform and enable the required API permissions.
2. Open **Integrations → 123 Cloud** and add a new configuration.
3. Fill in the alias, `Client ID`, `Client Secret`, and path prefix.
4. Choose a file conflict policy and save; if you have multiple accounts, you can designate a default.
5. Create an organization rule and select **Cloud Storage Transfer → 123 Cloud**, then pick the corresponding configuration.

![123 Cloud Client ID and Client Secret configuration](/images/zh/cloud-storage-pan123-key.png)

When the path prefix is empty, the app uses the default directory `/EasyTidyPro_UploadFiles`. 123 Cloud currently cannot be mounted as a Windows drive letter, pending official WebDAV support.

Do not expose your `Client Secret` in feedback, screenshots, or logs. If a credential has been leaked, reset it immediately on the Open Platform.

## Using Cloud Storage in Organization Tasks

1. First complete at least one cloud storage configuration on the **Integrations** page.
2. Create or edit an organization rule and set the operation to **Cloud Storage Transfer**.
3. Choose upload or retrieve, the storage type, and the specific configuration.
4. Optionally fill in a task-level path prefix. This path is combined with the base path from the integration configuration.
5. After saving, test with a small number of files first to confirm the directory structure and conflict handling behave as expected.

![Cloud Storage Transfer configuration in an organization rule](/images/zh/cloud-storage-rule-transfer.png)

When multiple configurations of the same type exist, the rule records the selected one; the default is used when no explicit selection is made. If a configuration referenced by a rule is deleted, you should re-edit the affected rules.

## File Conflicts

Each integration can set how to handle duplicate file names; when not set individually, the application's global file conflict policy applies. Before running in production, test the overwrite, skip, or rename behavior with sample files that share names — especially for automatically executed rules.

## Drive Mounting

WebDAV and S3 configurations can be mounted as Windows drive letters. On first use, the app prepares the rclone and WinFsp runtime environment; once ready, select an unused drive letter.

![Cloud storage drive mount and cache status](/images/zh/cloud-storage-drive-mount.webp)

- Mounting depends on network connectivity; cloud file response times are generally lower than local disk.
- Mounts use local caching; you can view or clear the cache on the Integrations page.
- Enable "Auto-mount drives on startup" in Settings.
- Mounting fails when the drive letter is already in use, WinFsp is not correctly installed, or credentials are invalid.

## FAQ

### Connected successfully but cannot upload

Verify that the remote path is writable, the account has permission to create directories and upload files, and the server-side quota is sufficient. For S3, also confirm that the Bucket, Region, and Endpoint are mutually consistent.

### Getting 401, 403, or authentication failures

Re-check your access credentials. For Baidu Netdisk, try re-authorizing. For 123 Cloud, confirm that the `Client ID` and `Client Secret` belong to the same valid application and that the application has the required permissions.

### Files end up in an unexpected directory

Check the path prefix in both the integration configuration and the organization rule. It is recommended to consistently use the `/directory-name` format and avoid writing server addresses or bucket names into the path prefix.

### WebDAV restore list is empty

Confirm that the current configuration uses the same server and remote directory as when the backup was created, and that the account has permission to list and download files from that directory.
