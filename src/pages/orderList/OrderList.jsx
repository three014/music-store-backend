import "./orderList.css"
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls";
import { useEffect } from "react";


//Renders a list of orders in a data grid

export default function OrderList(){
    //Gets the orders array from the Redux store using the useSelector hook
    const orders = useSelector((state) => state.order.orders);
    const users = useSelector((state) => state.user.users);

    //Fetches orders when component mounts, dispatches actions to the Redux store
    const dispatch = useDispatch();
    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    //Fetches usernames from users based on userID
    const getUsernameFromID = (userID) => {
        const user = users.find((user) => user._id === userID);
        return user ? user.username : "";
    };

    //Shows full details of products in an order when hovered
    const renderProductsCell = (params) => {
        return (
          <div title={params.value}>
            {params.value}
          </div>
        );
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 100 },
        { field: "userID", headerName: "User ID", width: 150 },
        { field: "username", headerName: "Username", width: 150,
            valueGetter: (params) => getUsernameFromID(params.row.userID),
        },
        { field: "products", headerName: "Products", minWidth: 250, renderCell: renderProductsCell,
            //Maps through the products array in each order
            valueGetter: (params) => {
                const products = params.row.products.map(
                  (product) => `(Product ID: ${product.productID}) (Quantity: ${product.quantity})`
                );
                return products.join("\n");
            },
        },
        { field: "amount", headerName: "Total Amount", width: 200 },
        { field: "address", headerName: "Address", width: 150 },
        { field: "status", headerName: "Order Status", width: 170 },
        { field: "createdAt", headerName: "Created At", width: 150 },
        { field: "updatedAt", headerName: "Updated At", width: 150 },
    ];
      
    return(
        <div className="orderList">
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row)=>row._id}
                pageSize={15}
                checkboxSelection
            />
        </div>
    );
};