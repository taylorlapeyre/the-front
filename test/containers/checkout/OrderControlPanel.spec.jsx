/* eslint max-len:0 */
import React from 'react'
import { shallow } from 'enzyme'
import { OrderControlPanel } from 'containers/checkout/OrderControlPanel.jsx'
import Address from 'components/checkout/Address.jsx'
import ChooseAddressModal from 'containers/modals/ChooseAddressModal.jsx'
import ChooseCreditCardModal from 'containers/modals/ChooseCreditCardModal.jsx'
import EverlaneNowDetailsModal from 'containers/modals/EverlaneNowDetailsModal.jsx'
import ShippingOptionsForm from 'components/forms/ShippingOptionsForm.jsx'
import GiftCodeForm from 'components/forms/GiftCodeForm.jsx'
import CreditCard from 'components/checkout/CreditCard.jsx'

describe('containers/checkout/OrderControlPanel.jsx', () => {
  let wrapper
  let chooseShippingOption
  let showModal
  let redeemGiftCode
  let onChange

  const address = { street_address: '123 Main St.' }
  const creditCard = { number: '4111************' }
  const shippingOptions = [{ expedited: false }, { expedited: true }]
  const everlaneNowDetails = { phoneNumber: '5042362750', note: '', instructions: '' }

  beforeEach(() => {
    chooseShippingOption = jasmine.createSpy('chooseShippingOption')
    showModal = jasmine.createSpy('showModal')
    redeemGiftCode = jasmine.createSpy('redeemGiftCode').and.returnValue({ then: f => f() })
    onChange = jasmine.createSpy('onChange')

    wrapper = shallow(
      <OrderControlPanel
        shippingOptions={shippingOptions}
        address={address}
        creditCard={creditCard}
        everlaneNowDetails={everlaneNowDetails}
        chooseShippingOption={chooseShippingOption}
        showModal={showModal}
        redeemGiftCode={redeemGiftCode}
        onChange={onChange}
      />
    )
  })

  it('renders an Address that can pop up the ChooseAddressModal', () => {
    const theAddress = wrapper.find(Address).first()

    expect(theAddress.prop('street_address')).toEqual(address.street_address)

    theAddress.prop('action')({ preventDefault: f => f })
    expect(showModal).toHaveBeenCalled()
    expect(showModal.calls.mostRecent().args[0].type).toEqual(ChooseAddressModal)
  })

  it('renders a CreditCard that can pop up the ChooseCreditCardModal', () => {
    const theCreditCard = wrapper.find(CreditCard).first()

    expect(theCreditCard.prop('number')).toEqual(creditCard.number)

    theCreditCard.prop('action')({ preventDefault: f => f })
    expect(showModal).toHaveBeenCalled()
    expect(showModal.calls.mostRecent().args[0].type).toEqual(ChooseCreditCardModal)
  })

  it('renders a CreditCard that can pop up the ChooseCreditCardModal', () => {
    const theCreditCard = wrapper.find(CreditCard).first()

    expect(theCreditCard.prop('number')).toEqual(creditCard.number)

    theCreditCard.prop('action')({ preventDefault: f => f })
    expect(showModal).toHaveBeenCalled()
    expect(showModal.calls.mostRecent().args[0].type).toEqual(ChooseCreditCardModal)
  })

  it('renders messaging for everlane now when a phone number has been given', () => {
    expect(wrapper.find('.order-control-pannel__everlane-now-details').length).toBe(1)
  })

  it('renders a ShippingOptionsForm with the correct shipping options', () => {
    expect(wrapper.find(ShippingOptionsForm).length).toBe(1)
    expect(wrapper.find(ShippingOptionsForm).first().prop('shippingOptions')).toBe(shippingOptions)
  })

  it('will trigger `onChange` and `chooseShippingOption` when a shipping option is selected, ', () => {
    wrapper.find(ShippingOptionsForm).first().simulate('change', 2)
    expect(chooseShippingOption).toHaveBeenCalledWith(2)
    expect(onChange).toHaveBeenCalled()
  })

  it('will trigger `onChange` and `chooseShippingOption` when a shipping option is selected', () => {
    wrapper.find(ShippingOptionsForm).first().simulate('change', 2)
    expect(chooseShippingOption).toHaveBeenCalledWith(2)
    expect(onChange).toHaveBeenCalled()
  })

  it('will show the EverlaneNowDetailsModal when an everlane now shipping option is selected', () => {
    wrapper.find(ShippingOptionsForm).first().simulate('chooseEverlaneNowOption')
    expect(showModal).toHaveBeenCalled()
    expect(showModal.calls.mostRecent().args[0].type).toEqual(EverlaneNowDetailsModal)
  })

  it('renders a GiftCodeForm', () => {
    expect(wrapper.find(GiftCodeForm).length).toBe(1)
  })

  it('will redeem a giftcode and trigger change when the GiftCodeForm is submitted', () => {
    wrapper.find(GiftCodeForm).first().simulate('submit', 'i am a giftcode')
    expect(redeemGiftCode).toHaveBeenCalledWith('i am a giftcode')
    expect(onChange).toHaveBeenCalled()
  })
})
