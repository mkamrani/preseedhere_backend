const { handler } = require(".");


const event = {
  body: {
    action: 'create',
    title: 't1',
    content: `
asfsafsafsfsfsfs
sfsfsdf
sfs
fsdfsdf
sdfs
dfsd
fsdfs
fsdf
  `
  }
}


handler(event, null).then(r => {
  console.log(r);
});