exports.formatDates = list => {
  // let newArr = list.map(items => {
  //   for (let key in items) {
  //     console.log(key, items, "<<<<keys and itesm");
  //     if (key === "created_at") {
  //       key = new Date(items[key]);
  //     }
  //     console.log(key, items);
  //     return items;
  //   }
  //   return items;
  // });
  const newArr = [];
  if (list.length !== 0) {
    const reformattedDate = new Date(list[0].created_at);
    const formattedArticle = { created_at: reformattedDate };
    newArr.push(formattedArticle);
  }
  return newArr;
};

// const object = { a: 1, b: 2, c: 3 };

// for (const property in object) {
//   console.log(`${property}: ${object[property]}`);
// }

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
