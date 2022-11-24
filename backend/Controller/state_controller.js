const Item = require('../Models/item');
// const mongoose = require('mongoose');

module.exports = {
    fetch(req, res) {
        Item.find({})
            .then(data => {
                // console.log(data);
                res.send(data)
            })
    },
    mutation(req, res) {
        const { msg } = req.body
        // console.log('in');

        if (msg === "ADD_ITEM") {
            const { data } = req.body;
            // console.log(data);
            const { name, quantity, date, price } = data;
            Item.find({ name })
                .then(data => {
                    // console.log(data);
                    if (data.length === 0) {
                        const item = new Item({
                            name,
                            quantity,
                            date,
                            price
                        })
                        item.save()
                            .then(() => res.send({ msg: 'User created' }))
                    }
                    else {
                        res.send({ msg: "Item is already Present" });
                    }
                })
        }

        if (msg === "UPDATE") {
            const { id, name, quantity, price } = req.body.data;
            // console.log(quantity);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = dd + '/' + mm + '/' + yyyy;

            Item.find({ name })
                .then(data => {
                    if (quantity * price < 0) {
                        res.send({ msg: "Data is not valid..." });
                    }
                    else {
                        if (data.length !== 0 && id !== String(data[0]._id)) {
                            res.send({ msg: "Item is already present." })
                        }
                        else {
                            Item.update({ _id: id }, { name, quantity, date: today, price })
                                .then(result => {
                                    res.send({ msg: 'Data has been updated' })
                                })
                        }
                    }
                })
        }

        if (msg === "UPDATE_BOX") {
            const { id } = req.body;
            // console.log(id);
            Item.find({ _id: id })
                .then(out => res.send(out[0]))
        }

        if (msg === "DELETE") {
            const { id } = req.body

            Item.remove({ _id: id }, function (err) {
                if (err) {
                    res.send({ msg: "something went Wrong" })
                }
                else {
                    res.send({ msg: "Data Deleted Successfully" })
                }
            })
        }

        // if (msg === "REFACTOR") {
        //     const { sell } = req.body;
        //     // console.log("in");

        //     sell.length !== 0 && sell.map(item => {
        //         const { id, quantity } = item;

        //         Item.find({ _id: id })
        //             .then(data => {
        //                 if (data.length != 0) {
        //                     const quantity_present = data[0].quantity;

        //                     Item.update({ _id: id }, { quantity: (parseInt(quantity_present) + parseInt(quantity)) })
        //                         .then(final => res.send({ msg: "data is restore..." }))
        //                 }
        //             })
        //     })
        // }

        if (msg === "SELL_CHECK") {
            const { data } = req.body;
            const { name, quantity } = data;

            Item.find({ name })
                .then(data => {
                    if (data.length === 0) {
                        res.send({ msg: "Item is not present." })
                    }
                    else {
                        const quantity_already = data[0].quantity;
                        const price = data[0].price;
                        const id = data[0]._id;

                        if (quantity_already >= quantity) {
                            if (quantity_already === quantity) {
                                Item.remove({ _id: id }, function (err) {
                                    if (err) {
                                        res.send({ msg: "something went Wrong" })
                                    }
                                    else {
                                        res.send({ msg: 'Data has been updated' })
                                    }
                                })
                            }
                            else {
                                Item.update({ _id: id }, { quantity: (quantity_already - quantity) })
                                    .then(() => {
                                        res.send({ msg: 'Valid data', id, price: (price * quantity) })
                                    })
                            }

                        }
                        else {
                            res.send({ msg: "Requested Quantity is not Available" })
                        }
                    }
                })
        }
    }
}