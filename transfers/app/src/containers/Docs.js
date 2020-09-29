import React from 'react';

const App = () => {
    return ( 
        <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
             <h2>A Simple Payroll using Flutterwave's Rave API.</h2>
                <p><b>NB: </b>We tried to leverage on the necessary APIs we needed for this work. This is not a production app, that is why we only touched only the key features and functionalities needed. If you want to make this into a production app, then you have to take into consideration everything your user will need and problems they are likely to encounter and incoporate them in your app.....Eg Transaction History etc.</p>

                <p>I believe by coming here you already know about <b>Rave by Flutterwave</b>. If not <a href="http://rave.flutterwave.com" target="_blank">Click Here</a> to read more about the amazing product.</p>

                <p>This app does a simple thing. Fund your wallet, send/transfer money to people from your wallet, even bulk transfer where you can transfer to more than 1000 people at once.</p>

                <h3>APIs Used</h3>
                <p>Read More abount them: <a href="https://flutterwavedevelopers.readme.io/v2.0/reference">https://flutterwavedevelopers.readme.io/v2.0/reference</a>
                    <br />
                    <b>1. Rave Standard</b><br />
                    <small>Used to accept payment from your card/account and fund your wallet on the app.</small><br />
                    <b>2. Verify Transaction</b><br />
                    <small>Before crediting your wallet on the app, we make sure that you actually paid. We verify the transaction from the reference produced when return the call.</small><br />
                    <b>3. List of Banks for Transfer</b><br />
                    <small>This gets a list of banks you can transfer to in NGN, GHS, KES i.e. Nigeria, Ghana and Kenya.</small><br />
                    <b>4. Initiate Transfer</b><br />
                    <small>This API enables you to transfer fron your wallet to a single recipient.</small><br />
                    <b>5. Fetch a Transfer</b><br />
                    <small>We actually want to be sure the single transfer went through, so we use this API to determine that.</small><br />
                    <b>6. Bulk Transfer</b><br />
                    <small>With this API, we can transfer to more than 1000 recipient at once.</small><br />
                    <b>7. Retrieve Status of Bulk Transfer</b><br />
                    <small>We use this to determine the status of the bulk transfer. Using the <code>batch_id</code> from the bulk transfer, we check for successful and failed transfer of each user in the bulk transfer.</small><br />
                    <b>8. Account Verification</b><br />
                    <small>Do not send money to the wrong person....This API helps you verify the account.</small><br />
                </p>
                <p>There are tons of APIs made available for you to build upon. Read the API documentation from the link above and build your next amazing app.</p>
                <p>If you need help to integrate this features in your system, feel free to reach out to <i><b>ugwumadu116@gmail.com</b></i> and he will respond immediately.</p>
            
            </div>

        </div>
        </div>
     );
}
 
export default App;