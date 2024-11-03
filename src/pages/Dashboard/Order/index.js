import React, { useCallback, useContext, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { HomeContext } from "../../../context/HomeContext";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Order() {
  const [items, setItems] = useState([]);
  // const navigate = useNavigate('')
  const { user, setIsAppLoading } = useContext(AuthContext);
  const { currentitem } = useContext(HomeContext);
  const { setCurrentitem } = useContext(HomeContext);

  const getitems = useCallback(async () => {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "items")
        // where("createdBy.uid", "==", user.uid)
      )
    );
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log(doc.id, " => ", data);
      array.push(data);
    });
    setItems(array);
  }, []);
  useEffect(() => {
    getitems();
  }, [getitems]);

  // const Addtocart = useCallback(async () => {
  //   setIsAppLoading(true);
  //   try {
  //     await setDoc(doc(firestore, "items", user.uid), { currentitem });
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsAppLoading(false);
  //   }
  // }, [currentitem]);

  // useEffect(() => {
  //   Addtocart();
  // }, [Addtocart]);

  const handlebuy = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(firestore, "cart", currentitem.id), currentitem);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAppLoading(false);
    }
  };
  return (
    <main className="frontend py-5">
      <div>
        <h1>Menu</h1>
        {/* <button className='btn btn-primary' onClick={() => navigate('/Add')} >Add Menu Items</button> */}
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <td>#</td>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>
                          <form onSubmit={handlebuy} className="d-inline">
                            <button
                              className="btn btn-primary mx-1 "
                              onClick={() => {
                                setCurrentitem({ ...item, uid: user.uid });
                              }}
                              // data-bs-toggle="modal"
                              // data-bs-target="#editModal"
                            >
                              Add to cart
                            </button>
                          </form>
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="text-center">
                <Link to="/dashboard/cart" className="btn btn-primary">
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
