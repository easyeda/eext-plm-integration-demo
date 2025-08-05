import * as extensionConfig from '../extension.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {}
export function about(): void {
	eda.sys_Dialog.showInformationMessage(eda.sys_I18n.text('PLM Demo v', undefined, undefined, extensionConfig.version), eda.sys_I18n.text('About'));
}
export function openIframeDownload(): void {
	eda.sys_IFrame.openIFrame('/iframe/download.html', 1500, 600, 'download');
}
export function openIframeUpload(): void {
	eda.sys_IFrame.openIFrame('/iframe/upload.html', 350, 220, 'upload');
}
export function openIframeSetting(): void {
	eda.sys_IFrame.openIFrame('/iframe/setting.html', 430, 310, 'setting');
}
