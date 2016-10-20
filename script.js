$dropzone = $('.dropzone');

const getDraggedFile = (event) => event.dataTransfer.files[0];

const fileTypeIsSupported = (file) => {
  return ['text/plain', 'text/markdown'].includes(file.type);
};

$dropzone.on('dragover', ({ event: originalEvent }) => {
  event.preventDefault();

  const file = getDraggedFile(event);

  if (fileTypeIsSupported(file)) {
    $dropzone.addClass('drag-over');
  } else {
    $dropzone.addClass('drag-error');
  }
});

$dropzone.on('dragleave', () => {
  $dropzone.removeClass('drag-over')
           .removeClass('drag-error');
});

$dropzone.on('drop', ({ event: originalEvent }) => {
  event.preventDefault();

  const file = getDraggedFile(event);

  if (fileTypeIsSupported(file)) {
    const reader = new FileReader();
    reader.onload = (event) => {
		  const text = event.target.result;
      $dropzone.text(text);
    }
    reader.readAsText(file);
  } else {
    alert('That file type is not supported');
  }

  $dropzone.removeClass('drag-over')
           .removeClass('drag-error');

  return false;
});
