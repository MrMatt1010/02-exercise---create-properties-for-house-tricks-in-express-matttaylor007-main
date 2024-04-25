const formatProperty = (property) => {
  return {
    id: property._id,
    askingPrice: property.askingPrice,
    description: property.description,
    address: property.address,
    title: property.title,
    img: property.img,
  };
};

module.exports = formatProperty;
