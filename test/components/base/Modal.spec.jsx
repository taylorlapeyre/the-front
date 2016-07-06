import React from 'react'
import { Modal } from 'components/base/Modal.jsx'
import { shallow } from 'enzyme'

describe('components/base/Modal', () => {
  let wrapper
  let onRequestClose

  beforeEach(() => {
    onRequestClose = jasmine.createSpy('onRequestClose')
    wrapper = shallow(
      <Modal onRequestClose={onRequestClose}>
        <h1>Hello World!</h1>
      </Modal>
    )
  })

  it('will have a width and top set when rendered', () => {
    expect(wrapper.find('.modal').prop('style').width).not.toBeFalsy()
    expect(wrapper.find('.modal').prop('style').top).not.toBeFalsy()
  })

  it('will render its children', () => {
    expect(wrapper.find('h1').text()).toEqual('Hello World!')
  })

  it('will call its onRequestClose prop when clicking the background', () => {
    wrapper.find('.modal__background').simulate('click', { preventDefault: x => x })
    expect(onRequestClose).toHaveBeenCalled()
    expect(onRequestClose.calls.count()).toEqual(1)
  })

  it('will call its onRequestClose prop when clicking the close icon', () => {
    wrapper.find('.modal__close-icon').simulate('click', { preventDefault: x => x })
    expect(onRequestClose).toHaveBeenCalled()
    expect(onRequestClose.calls.count()).toEqual(1)
  })
})
