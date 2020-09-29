import request from "../request";
export const handlePay = (amount ) => {
     const user = JSON.parse(
        sessionStorage.getItem("userData")
      );
      console.log(user)
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
          onclose: function() {},
          callback: async(d) => {
           
              const verifyResData = await request({
                url: `/flutterwave/verify`,
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                data: {txref: d.tx.txRef, user},
              });
              console.log(verifyResData)
              const {data} = verifyResData.data
                sessionStorage.setItem(
                "userData",
                JSON.stringify(data)
                );
                window.location.reload();
          }
        });
      }