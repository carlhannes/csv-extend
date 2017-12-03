import lq from 'litequery';

lq('#fileInput').on('change', () => {
  console.log('woop file!');
  const { files } = lq('#fileInput').get(0);

  const reader = new FileReader();

  reader.addEventListener('load', (e) => {
    console.log('ha-ha!', e.target.result);
  });

  reader.readAsText(files[0]);
});
