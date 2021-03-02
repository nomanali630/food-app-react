import React, { useState } from 'react';

const HOME_GARDEN = 'home and garden';
const ElectricItems = 'ELECTRIC ITEMS';

export default function Products({ setCart, cart }) {
  const [products] = useState([
    {
      category: ElectricItems,
      name: 'Bulb',
      cost: 50,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdhpP61G6nNGz0YrrBSoeaa1CJP-1eNU2GA&usqp=CAU',
    },
    {
      category: ElectricItems,
      name: 'Electric Bike',
      cost: 1999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdtG8x9-_RwDoEMSix2JMnGGCvnF2bY6jSA&usqp=CAU',
    },
    {
      category: ElectricItems,
      name: 'Electric Kettle',
      cost: 999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ZPw4eNXPSmSU9wayU1UgivUqyWSNH0D_nA&usqp=CAU',
    },
    {
      category: HOME_GARDEN,
      name: 'Table',
      cost: 5000,
      image:
        'data:image/jpeg;base64,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',
    },
    {
      category: HOME_GARDEN,
      name: 'Sun Sofa',
      cost: 1599,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4QERAQEBIQEBASFxENFxUVFw8PEQ4SGBcWGRUVFxgbHCgsGholHhYWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDysZHxktNy0rNysrLSstLSsrKy0rKystNystKzctKystLSsrKystNysrKystNysrLSsrKy03Lf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcDBAIFCAH/xABCEAACAgIAAwUFBgMECAcAAAABAgADBBEFEiEGBxMxQSJRYYGRFCMyUnGhQnKSM2KCsTRjg5OistHxCCRDc8HS0//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAQEBAAMBAAAAAAAAAAAAARECIQNBUTH/2gAMAwEAAhEDEQA/ALxiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIHycGs16TmTNbcJay+L8JxfIA85w6TC5BcKf5vpLSVuLaDMk0qRzP8F/zm7IpERAREQEREBERAREQEREBERAREQEREBERAREQEREDHcekw8omSw7P7TjLEtceUTiQF22uuvnOc6vtLnNRjXWJ1s5eWsfmuchKl+djIPnLUjNwDJa5Hs5ORTZYiEnZtrRuUWeXQMQxA69NHfWdvNHg+AuNRTQvUVIlO/VuVQOY/E6385vTLRERAREQEREBETXts9BA2Impzn3xzn3xia24miL2306/wDzM6ZGyB6wrPERAREQEREBERATDkXpWpd2VFHUsxCKv6k9Jj4jmV0VW32nlrqV7WPuVQSf2Epns3w/I7TZVuXnM68PoblShSQpYjYrBHqF5S7/AIiSANDyCzc3tzwen+0zsUfBbEsb6LszBw3vB4RlWpRRkiyywlVXw8heZtb0GKAeQPrOz4f2b4fjgCjExqtDW1rrDfNtbPzM37VHQaHTqPh01093mYAREgHb3vFGFaMPEr+0ZjcoI0WWpm1yLyr1dzsaUEa2NnrqVlP5HOMffZuBjDqqtZxCz3clAArH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EQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/9k=',
    },
    {
      category: HOME_GARDEN,
      name: 'Pub Garden Furniture',
      cost: 1199,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZ7rH-NvYnafFcehvRflIrLFXzkVxJSnHCQ&usqp=CAU'
    },
  ]);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  // const [category, setCategory] = useState(HOME_GARDEN);

  // const getProductsInCategory = () => {
  //   return products.filter(
  //     (product) => product.category === category
  //   );
  // };

  return (
    <>
      <h1>PRODUCTS</h1><br></br>
      {/* Select a category :
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={HOME_GARDEN}>{HOME_GARDEN}</option>
        <option value={ElectricItems}>{ElectricItems}</option>
      </select> */}
      <div className="container">
        <div className="row">
          {products.map((product, idx) => (
            // <div className="product" key={idx}>
            //   <h3>{product.name}</h3>
            //   <h4>Pkr:{product.cost}</h4>
            //   <img src={product.image} alt={product.name} />
            //   <button onClick={() => addToCart(product)}>
            //     Add to Cart
            //   </button>
            // </div>
            <div className="col-md-4 mt-4 " style={{ boxShadow: "0 0 10px grey" }} key={idx}>
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={product.image} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">pkr:{product.cost}</p>
                  <button onClick={() => addToCart(product)} className="btn btn-primary">
                    Add to Cart
           </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}