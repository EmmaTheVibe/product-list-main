import { useState, useEffect } from "react";
import data from "../data.json";
import Overlay from "./Overlay";
import Receipt from "./Receipt";
import Total from "./Total";
import ItemCard from "./ItemCard";
import OrderDetails from "./OrderDetails";
import OrderList from "./OrderList";
import OrderItem from "./OrderItem";
import Remark from "./Remark";
import Confirm from "./Confirm";

const colors = {
  red: "hsl(14, 86%, 42%)",
  green: "hsl(159, 69%, 38%)",
  lightRose: "hsl(20, 50%, 98%)",
  mediumRose: "hsl(13, 31%, 94%)",
  deepRose: "hsl(12, 20%, 44%)",
  dark: "hsl(14, 65%, 9%)",
};

function App() {
  const [menuItems, setMenuItems] = useState(data);
  const [orderItems, setOrderItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mq, setMq] = useState("desktop");

  useEffect(() => {
    const handleMediaQueryChange = () => {
      if (window.matchMedia("(max-width: 355px)").matches) {
        setMq("split");
      } else if (window.matchMedia("(max-width: 600px)").matches) {
        setMq("mobile");
      } else if (
        window.matchMedia("(min-width: 601px) and (max-width: 1024px)").matches
      ) {
        setMq("tab");
      } else if (window.matchMedia("(min-width: 1025px)").matches) {
        setMq("desktop");
      }
    };

    handleMediaQueryChange();

    window.addEventListener("resize", handleMediaQueryChange);

    return () => window.removeEventListener("resize", handleMediaQueryChange);
  }, []);

  function handleAddItem(item) {
    const newOrderItem = {
      name: item.name,
      times: 1,
      total: item.price,
      rate: item.price,
      id: Date.now(),
      thumbnail: item.image.thumbnail,
    };
    setOrderItems((orderItems) => [...orderItems, newOrderItem]);
    setMenuItems((menuItems) =>
      menuItems.map((menuItem) =>
        menuItem.name === item.name
          ? { ...menuItem, selected: !menuItem.selected }
          : menuItem
      )
    );
  }

  function increaseCount(name) {
    setOrderItems(
      orderItems.map((orderItem) =>
        orderItem.name === name
          ? {
              ...orderItem,
              times: orderItem.times + 1,
              total: (orderItem.times + 1) * orderItem.rate,
            }
          : orderItem
      )
    );
    setMenuItems((menuItems) =>
      menuItems.map((menuItem) =>
        menuItem.name === name
          ? { ...menuItem, count: menuItem.count + 1 }
          : menuItem
      )
    );
  }
  function decreaseCount(name) {
    setOrderItems(
      orderItems.map((orderItem) =>
        orderItem.name === name
          ? {
              ...orderItem,
              times: orderItem.times > 1 ? orderItem.times - 1 : 1,
              total:
                orderItem.times > 1
                  ? (orderItem.times - 1) * orderItem.rate
                  : orderItem.rate,
            }
          : orderItem
      )
    );
    setMenuItems((menuItems) =>
      menuItems.map((menuItem) =>
        menuItem.name === name
          ? { ...menuItem, count: menuItem.count > 1 ? menuItem.count - 1 : 1 }
          : menuItem
      )
    );
  }

  function removeItem(name) {
    setOrderItems((orderItems) =>
      orderItems.filter((item) => item.name !== name)
    );
    setMenuItems((menuItems) =>
      menuItems.map((menuItem) =>
        menuItem.name === name
          ? { ...menuItem, selected: false, count: 1 }
          : menuItem
      )
    );
  }

  function handleReceipt() {
    setShowOverlay(true);
  }

  function resetAll() {
    setShowOverlay(false);
    setOrderItems([]);
    setMenuItems(data);
  }

  return (
    <>
      {showOverlay && (
        <Overlay>
          <Receipt
            resetAll={resetAll}
            orderItems={orderItems}
            colors={colors}
            mq={mq}
          />
        </Overlay>
      )}
      <div className="main">
        <h1 className="title" style={{ color: colors.dark }}>
          Desserts
        </h1>
        <div className="container">
          <div className="menu">
            {menuItems.map((item) => (
              <ItemCard
                src={
                  mq === "desktop"
                    ? item.image.desktop
                    : mq === "tab"
                    ? item.image.tablet
                    : mq === "mobile"
                    ? item.image.mobile
                    : mq === "split"
                    ? item.image.mobile
                    : ""
                }
                category={item.category}
                name={item.name}
                price={item.price}
                key={item.name}
                selected={item.selected}
                count={item.count}
                increaseCount={increaseCount}
                decreaseCount={decreaseCount}
                onClick={() => handleAddItem(item)}
                colors={colors}
              />
            ))}
          </div>
          <OrderDetails orderItems={orderItems} colors={colors}>
            <OrderList>
              {orderItems.length > 0
                ? orderItems.map((orderItem) => (
                    <OrderItem
                      name={orderItem.name}
                      rate={orderItem.rate}
                      times={orderItem.times}
                      key={orderItem.id}
                      total={orderItem.total}
                      removeItem={removeItem}
                      colors={colors}
                    />
                  ))
                : ""}
            </OrderList>
            <Total orderItems={orderItems} className={"sum"} colors={colors} />
            <Remark colors={colors} />
            <Confirm handleReceipt={handleReceipt} />
          </OrderDetails>
        </div>
      </div>
    </>
  );
}

export default App;
