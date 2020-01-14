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

  // const newArr = [];
  // if (list.length !== 0) {
  //   const reformattedDate = new Date(list[0].created_at);
  //   const formattedArticle = { created_at: reformattedDate };
  //   newArr.push(formattedArticle);
  // }
  // return newArr;

  let result = list.map(({ created_at, ...objects }) => ({
    created_at: new Date(created_at),
    ...objects
  }));
  return result;
};

exports.makeRefObj = list => {
  let obj = {};
  for (let position in list) {
    obj[list[position].title] = list[position].article_id;
  }
  // console.log(obj);
  return obj;
};

exports.formatComments = (comments, articleRef) => {};
