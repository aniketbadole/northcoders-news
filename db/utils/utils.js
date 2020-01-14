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
  // use map

  // const newArr = [];
  // if (list.length !== 0) {
  //   const reformattedDate = new Date(list[0].created_at);
  //   const formattedArticle = { created_at: reformattedDate };
  //   newArr.push(formattedArticle);
  // }
  // return newArr;

  // [1, 2, 3].map(a => {
  //   console.log(a);
  // });

  let result = list.map(({ created_at, ...restOfKeys }) => ({
    created_at: new Date(created_at),
    ...restOfKeys
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

exports.formatComments = (comments, articleRef) => {
  const formattedComments = [];
  comments.forEach(item => {
    const newItem = { ...item };
    // console.log(newItem);
    const newObj = {
      body: newItem.body,
      author: newItem.created_by,
      article_id: articleRef[newItem.belongs_to],
      created_at: new Date(newItem.created_at),
      votes: newItem.votes
    };
    console.log(newObj);
    formattedComments.push(newObj);
  });
  return formattedComments;
};

// Its created_by property renamed to an author key
// Its belongs_to property renamed to an article_id key
// The value of the new article_id key must be the id corresponding to the original title value   provided
// Its created_at value converted into a javascript date object
// The rest of the comment's properties must be maintained
