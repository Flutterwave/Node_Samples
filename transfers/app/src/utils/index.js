import request from "../request";

export const getGroups = async () => {
    const user = JSON.parse(
        sessionStorage.getItem("userData")
    );
    const res = await request({
        url: `/auth/get-grops`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { ...user }
    });

    return res.data.data

}

export const addGroups = async (group, user) => {
    const groupRes = await request({
        url: `/auth/add-grops`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { user, group }
    });

    alert("Group added successfully")
    window.location.reload();

    return groupRes.data.data

}

export const getMembers = async (id) => {
   
    const res = await request({
        url: `/auth/get-members`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { id }
    });

    return res.data.data

}

export const addMembers = async (member) => {
    const groupRes = await request({
        url: `/auth/add-members`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { ...member }
    });

    alert("member added successfully")
    window.location.reload();

    return groupRes.data.data

}

export const getBanks = async () => {
    const banks = await request({
        url: `/flutterwave/banks`,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return banks.data.data

}

export const singleTransfer = async (info) => {
    const user = JSON.parse(
        sessionStorage.getItem("userData")
    );

    const reqData = {
        account_bank: info.bank,
        account_number: info.acctno,
        amount: info.amount,
        narration: info.comment,
        debit_currency: "NGN",
        currency: "NGN",
        reference: Date.now(),
    }
    const res = await request({
        url: `/flutterwave/single-transfer`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { reqData, user }
    });
    console.log(res)
    const { data } = res.data
    sessionStorage.setItem(
        "userData",
        JSON.stringify(data)
    );
        alert("transfer successful")
}

export const bulkTransfer = async (reqData) => {
    const user = JSON.parse(
        sessionStorage.getItem("userData")
    );
    const reqBody = {
    title: "Simple payroll bulk transfer",
    bulk_data: reqData,
}
    const res = await request({
        url: `/flutterwave/bulk-transfer`,
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { reqBody, user }
    });
    console.log(res)
    
        alert("bulk transfer successful")
}

export const handlePay = (amount) => {
    const user = JSON.parse(
        sessionStorage.getItem("userData")
    );
    window.getpaidSetup({
        amount: amount,
        txref: Date.now(),
        PBFPubKey: 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',  // Add your public key here
        custom_title: 'React Pay',
        payment_method: 'both',
        customer_email: 'test@example.com',
        currency: "NGN",
        customer_firstname: user.fullname,
        customer_phone: '08066543321',
        onclose: function () { },
        callback: async (d) => {

            const verifyResData = await request({
                url: `/flutterwave/verify`,
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: { txref: d.tx.txRef, user },
            });
            console.log(verifyResData)
            const { data } = verifyResData.data
            sessionStorage.setItem(
                "userData",
                JSON.stringify(data)
            );
            window.location.reload();
        }
    });
}