import React from 'react';

export default function Cart({ cart, setCart }) {
  const getTotalSum = () => {
    return cart.reduce(
      (sum, { cost, quantity }) => sum + cost * quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };

  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
      <div className="products">
        <div className="row">
          {cart.map((product, idx) => (
            // <div className="product" key={idx}>
            //   <h3>{product.name}</h3>
            //   <h4>Pkr:{product.cost}</h4>
            //   <input
            //     value={product.quantity}
            //     onChange={(e) =>
            //       setQuantity(
            //         product,
            //         parseInt(e.target.value)
            //       )
            //     }
            //   />
            //   <img src={product.image} alt={product.name} />
            //   <button onClick={() => removeFromCart(product)}>
            //     Remove
            //   </button>
            // </div>
            <div className="col-md-4 mt-4 " style={{ boxShadow: "0 0 10px grey" }}>
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

      <h2>Total Cost: Pkr:{getTotalSum()}</h2>
    </>
  );
}