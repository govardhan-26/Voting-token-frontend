import {
    assert,
    bsv,
    ContractTransaction,
    hash256,
    method,
    MethodCallOptions,
    prop,
    PubKey,
    Sig,
    SigHash,
    SmartContract,ByteString,toByteString,
} from 'scrypt-ts'

/**
 * re-callable satoshis demo
 * users can transfer these satoshis as wish, and issuer can recall them back to himself at anytime
 */

export class Identity extends SmartContract {
    // the public key of issuer
    @prop()
    m:ByteString
    @prop()
    readonly issuerPubKey: PubKey

    // the public key of current user
    @prop(true)
    userPubKey: PubKey
 
  

    constructor(issuer: PubKey,message: ByteString) {
        super(...arguments)
        this.issuerPubKey = issuer
        this.userPubKey = issuer // the first user is the issuer himself
        this.m=message
    }

    @method(SigHash.ANYONECANPAY_SINGLE)
    public transfer2(
        userSig: Sig, // then current user should provide his signature before transfer
        receiverPubKey: PubKey, // send to
        satoshisSent: bigint // send amount
    ) {
       
        const satoshisTotal = this.ctx.utxo.value
        // require the amount requested to be transferred is valid
        assert(
            satoshisSent > 0 && satoshisSent <= satoshisTotal,
            `invalid value of \`satoshisSent\`, should be greater than 0 and less than or equal to ${satoshisTotal}`
        )

        // require the current user to provide signature before transfer
        assert(
            this.checkSig(userSig, this.userPubKey),
            "user's signature check failed"
        )
        assert(
            this.userPubKey == receiverPubKey ||
                this.userPubKey == this.issuerPubKey,
            'Identity tokens cant be transfer'
        )

        // temp record previous user
        const previousUserPubKey = this.userPubKey

  
        this.userPubKey = receiverPubKey
   


        assert(
          1 ==1,
            'hashOutputs check failed'
        )
    
      
    }
    @method()
    public transfer1(
        userSig: Sig, // the current user should provide his signature before transfer
        receiverPubKey: PubKey, // send to
        satoshisSent: bigint // send amount
    ) {
        // total satoshis locked in this contract utxo
        const satoshisTotal = this.ctx.utxo.value
        // require the amount requested to be transferred is valid
        assert(
            satoshisSent > 0 && satoshisSent <= satoshisTotal,
            `invalid value of \`satoshisSent\`, should be greater than 0 and less than or equal to ${satoshisTotal}`
        )

        // require the current user to provide signature before transfer
        assert(
            this.checkSig(userSig, this.userPubKey),
            "user's signature check failed"
        )
        // assert(
        //     this.userPubKey == receiverPubKey ||
        //         this.userPubKey == this.issuerPubKey,
        //     'Identity tokens cant be transfer'
        // )

        // temp record previous user
        const previousUserPubKey = this.userPubKey

        // construct all the outputs of the method calling tx

        // the output send to `receiver`
        this.userPubKey = receiverPubKey
        let outputs = this.buildStateOutput(satoshisSent)

        // the change output back to previous `user`
        const satoshisLeft = satoshisTotal - satoshisSent
        if (satoshisLeft > 0) {
            this.userPubKey = previousUserPubKey
            outputs += this.buildStateOutput(satoshisLeft)
        }

        // // the change output for paying the transaction fee
        if (this.changeAmount > 0) {
            outputs += this.buildChangeOutput()
        }

        // require all of these outputs are actually in the unlocking transaction
        assert(
            hash256(outputs) == this.ctx.hashOutputs,
            'hashOutputs check failed'
        )
    }
    @method()
    public unlock(sig: Sig, pubkey: PubKey) {
        // Check if the passed public key belongs to the specified address.
    
        assert(this.checkSig(sig, pubkey), 'signature check failed')
    
    }
    @method()
    public recall(issuerSig: Sig) {
        assert(
            this.checkSig(issuerSig, this.issuerPubKey),
            "issuer's signature check failed"
        )

        this.userPubKey = this.issuerPubKey
        // the amount is satoshis locked in this UTXO
        let outputs = this.buildStateOutput(this.ctx.utxo.value)

        if (this.changeAmount > 0) {
            outputs += this.buildChangeOutput()
        }

        // require all of these outputs are actually in the unlocking transaction
        this.debug.diffOutputs(outputs) 
        assert(
            hash256(outputs) == this.ctx.hashOutputs,
            'hashOutputs check failed'
        )
    }
   
}
