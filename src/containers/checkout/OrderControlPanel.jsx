// @flow
import React, { Element } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import Address from 'components/checkout/Address.jsx'
import CreditCard from 'components/checkout/CreditCard.jsx'
import ShippingOptionsForm from 'components/forms/ShippingOptionsForm.jsx'
import GiftCodeForm from 'components/forms/GiftCodeForm.jsx'
import ChooseAddressModal from 'containers/modals/ChooseAddressModal.jsx'
import ChooseCreditCardModal from 'containers/modals/ChooseCreditCardModal.jsx'
import EverlaneNowDetailsModal from 'containers/modals/EverlaneNowDetailsModal.jsx'
import { getPrimaryAddress, getPrimaryCreditCard } from 'reducers/session/user'
import type { DispatchType } from 'types/redux'
import type {
  AddressType,
  CreditCardType,
  ShippingOptionType,
  EverlaneNowDetailsType,
} from 'types/everlane'

export function OrderControlPanel(props: {
  address: AddressType,
  creditCard: CreditCardType,
  shippingOptions: Array<ShippingOptionType>,
  everlaneNowDetails: EverlaneNowDetailsType,
  chooseShippingOption: (shippingOption: ShippingOptionType) => void,
  redeemGiftCode: (giftCode: string) => Promise,
  showModal: (modal: Element) => void,
  onChange: () => void,
}) {
  const { address, creditCard, shippingOptions, onChange, showModal, everlaneNowDetails } = props

  function resetShippingOption() {
    props.chooseShippingOption(0)
    onChange()
  }

  function showChangeAddressModal(event: Object) {
    event.preventDefault()
    showModal(<ChooseAddressModal onChooseAddress={onChange} />)
  }

  function showEverlaneNowModal() {
    showModal(<EverlaneNowDetailsModal onCancel={resetShippingOption} />)
  }

  function showChangeCreditCardModal(event: Object) {
    event.preventDefault()
    showModal(<ChooseCreditCardModal />)
  }

  function handleChooseShippingOption(newOption: ShippingOptionType) {
    props.chooseShippingOption(newOption)
    onChange()
  }

  function handleredeemGiftCode(giftCode: string) {
    props.redeemGiftCode(giftCode).then(onChange)
  }

  const everlaneNowDetail = everlaneNowDetails.phoneNumber && (
    <div className="order-control-pannel__everlane-now-details">
      <p>We will text you at {everlaneNowDetails.phoneNumber} when your order is on the way.</p>
    </div>
  )

  return (
    <div className="order-control-pannel">
      <section className="order-control-pannel__address-section">
        <h3 className="order-control-pannel__section-title">Shipping Address</h3>
        <Address {...address} action={showChangeAddressModal} actionText="Change Address" />
      </section>
      <section className="order-control-pannel__credit-card-section">
        <h3 className="order-control-pannel__section-title">Billing Information</h3>
        <CreditCard
          {...creditCard}
          action={showChangeCreditCardModal}
          actionText="Change Credit Card"
        />
      </section>
      <section className="order-control-pannel__shipping-options-section">
        <h3 className="order-control-pannel__section-title">Shipping Options</h3>
        <ShippingOptionsForm
          shippingOptions={shippingOptions}
          onChange={handleChooseShippingOption}
          onChooseEverlaneNowOption={showEverlaneNowModal}
        />
        {everlaneNowDetail}
      </section>
      <section className="order-control-pannel__gift-code-section">
        <h3 className="order-control-pannel__section-title">Gift Code</h3>
        <GiftCodeForm onSubmit={handleredeemGiftCode} />
      </section>
    </div>
  )
}

function mapStateToProps(state: Object): Object {
  return {
    shippingOptions: state.checkout.shippingOptions,
    address: getPrimaryAddress(state),
    creditCard: getPrimaryCreditCard(state),
    everlaneNowDetails: state.checkout.everlaneNow,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    chooseShippingOption: (newOption) => dispatch(actions.chooseShippingOption(newOption)),
    showModal: (modal) => dispatch(actions.showModal(modal)),
    redeemGiftCode: (giftCode) => dispatch(actions.redeemGiftCode(giftCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderControlPanel)
