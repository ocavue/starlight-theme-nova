import * as React from 'react'

export function MyReactTabs({
  child1,
  child2,
}: {
  child1: React.ReactNode
  child2: React.ReactNode
}) {
  const [activeTab, setActiveTab] = React.useState(0)

  const name = '<MyReactTabs>'

  return (
      <fieldset>
        <legend>{name}</legend>
        <div>
          <button onClick={() => setActiveTab(0)}>Show Child 1</button>
          <button onClick={() => setActiveTab(1)}>Show Child 2</button>
        </div>
        <div>{activeTab === 0 ? child1 : child2}</div>
      </fieldset>
  )
}
