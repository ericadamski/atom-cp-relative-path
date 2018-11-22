'use babel';

import { copy } from 'copy-paste';
import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'cp-relative-path:cp': () => this.cp(),
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {},

  cp() {
    const editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      const path = atom.project.relativize(editor.getPath());

      copy(path, () => {
        const n = atom.notifications.addSuccess(
          `Successfully copied ${path} to clipboard! 🚀`,
          {
            dismissable: true,
            icon: 'rocket',
          }
        );

        setTimeout(() => n.dismiss(), 2000);
      });
    }
  },
};
