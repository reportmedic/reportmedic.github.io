/* ReportMedic Dropzone Enhancer (no dependencies)
   - Wraps <input type="file"> with a modern drag & drop zone.
   - Preserves existing page logic by dispatching the native "change" event.
*/
(function () {
  'use strict';

  var ICON_PATHS = ["M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5 c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16 C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86 c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69 c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9 c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6 c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6 c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z", "M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5 C310.4,285.3,318.9,285.3,324.2,280z"];

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') n.className = attrs[k];
        else if (k === 'html') n.innerHTML = attrs[k];
        else if (k === 'text') n.textContent = attrs[k];
        else n.setAttribute(k, attrs[k]);
      });
    }
    if (children && children.length) {
      children.forEach(function (c) {
        if (c == null) return;
        if (typeof c === 'string') n.appendChild(document.createTextNode(c));
        else n.appendChild(c);
      });
    }
    return n;
  }

  function buildIcon() {
    var svg = el('svg', {
      class: 'rm-dz-svg',
      viewBox: '0 0 486.3 486.3',
      width: '34',
      height: '34',
      'aria-hidden': 'true',
      focusable: 'false'
    });
    for (var i = 0; i < ICON_PATHS.length; i++) {
      svg.appendChild(el('path', { d: ICON_PATHS[i], fill: 'currentColor' }));
    }
    return svg;
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return '';
    var units = ['B','KB','MB','GB','TB'];
    var i = 0;
    var b = bytes;
    while (b >= 1024 && i < units.length - 1) {
      b = b / 1024;
      i++;
    }
    var val = (i === 0) ? String(Math.round(b)) : (Math.round(b * 10) / 10).toString();
    return val + ' ' + units[i];
  }

  function summarizeFiles(input) {
    var files = input.files ? Array.prototype.slice.call(input.files) : [];
    if (!files.length) return 'No file selected';
    if (files.length === 1) {
      return files[0].name + ' • ' + formatBytes(files[0].size);
    }
    var shown = files.slice(0, 3).map(function (f) { return f.name; });
    var more = files.length - shown.length;
    return shown.join(', ') + (more > 0 ? (' + ' + more + ' more') : '');
  }

  function dispatchChange(input) {
    try {
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (e) {
      var evt = document.createEvent('Event');
      evt.initEvent('change', true, true);
      input.dispatchEvent(evt);
    }
  }

  function attachDropzone(input) {
    if (!input || input.dataset.rmDropzoneApplied === '1') return;
    if (input.getAttribute('type') !== 'file') return;
    if (input.hasAttribute('disabled')) return;
    if (input.dataset.rmDropzone === 'off') return;

    var sizeClass = input.dataset.rmDropzoneSize ? (' rm-dropzone--' + input.dataset.rmDropzoneSize) : '';

    // Create dropzone
    var dz = el('div', {
      class: 'rm-dropzone' + sizeClass,
      role: 'button',
      tabindex: '0'
    });

    var inner = el('div', { class: 'rm-dz-inner' });
    var iconWrap = el('div', { class: 'rm-dz-icon' }, [buildIcon()]);

    var copy = el('div', { class: 'rm-dz-copy' }, [
      el('div', { class: 'rm-dz-title', text: 'Drag and Drop' }),
      el('div', { class: 'rm-dz-or', text: 'or' }),
      el('button', { type: 'button', class: 'btn primary small rm-dz-browse', text: (input.multiple ? 'Browse files' : 'Browse file') })
    ]);

    inner.appendChild(iconWrap);
    inner.appendChild(copy);

    var selected = el('div', { class: 'rm-dz-selected tiny muted', text: summarizeFiles(input) });
    dz.appendChild(inner);
    dz.appendChild(selected);

    // Insert dropzone right before input, then hide input
    input.classList.add('rm-hidden-file');
    input.parentNode.insertBefore(dz, input);

    // Click/keyboard open
    function openPicker() { input.click(); }

    dz.addEventListener('click', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('rm-dz-browse')) return;
      openPicker();
    });
    dz.querySelector('.rm-dz-browse').addEventListener('click', function () { openPicker(); });

    dz.addEventListener('keydown', function (e) {
      var key = e.key || e.keyCode;
      if (key === 'Enter' || key === ' ' || key === 13 || key === 32) {
        e.preventDefault();
        openPicker();
      }
    });

    // Drag & drop behavior
    ['dragenter','dragover'].forEach(function (t) {
      dz.addEventListener(t, function (e) {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.add('is-dragover');
      });
    });

    ['dragleave','dragend','drop'].forEach(function (t) {
      dz.addEventListener(t, function (e) {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.remove('is-dragover');
      });
    });

    dz.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      if (!dt || !dt.files || !dt.files.length) return;

      var transfer = new DataTransfer();
      if (input.multiple) {
        for (var i = 0; i < dt.files.length; i++) transfer.items.add(dt.files[i]);
      } else {
        transfer.items.add(dt.files[0]);
      }
      input.files = transfer.files;
      dispatchChange(input);
    });

    // Keep selected text in sync (even if other code modifies input)
    input.addEventListener('change', function () {
      selected.textContent = summarizeFiles(input);
      dz.classList.toggle('has-file', !!(input.files && input.files.length));
    });

    input.dataset.rmDropzoneApplied = '1';
    dz.classList.toggle('has-file', !!(input.files && input.files.length));
  }

  function init() {
    var inputs = document.querySelectorAll('input[type="file"]');
    for (var i = 0; i < inputs.length; i++) attachDropzone(inputs[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
