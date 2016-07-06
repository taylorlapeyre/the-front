// @flow
/* eslint camelcase:0 */

import React from 'react'
import classnames from 'classnames'
import type { VariantType } from 'types/everlane'

let tabIndex: number = 0

export function VariantOption({ size, id, selected, orderable_state, onClick }: {
  id: number,
  size: string,
  selected?: boolean,
  orderable_state: string,
  onClick: (id: number) => void,
}) {
  function handleClick(event: Event) {
    event.preventDefault()
    onClick(id)
  }

  const className: string = classnames('variant-selector__option', {
    'variant-selector__option--active': selected,
    'variant-selector__option--sold-out': orderable_state === 'sold-out',
    'variant-selector__option--waitlistable': orderable_state === 'waitlistable',
    'variant-selector__option--preorderable': orderable_state === 'preorderable',
  })

  return (
    <div
      onClick={handleClick}
      className={className}
      role="radio"
      tabIndex={tabIndex++}
      aria-label={size}
    >{size}</div>
  )
}

function VariantSelector(props: {
  variants: Array<VariantType>,
  currentVariantId?: number,
  onSelectVariant: (id: string) => void,
}) {
  function renderVariants() {
    return props.variants.map(variant => (
      <VariantOption {...variant} key={variant.id} onClick={props.onSelectVariant} />
    ))
  }

  return (
    <div className="variant-selector">
      {renderVariants()}
    </div>
  )
}

export default VariantSelector
