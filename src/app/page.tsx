'use client'

import { useState } from 'react'
import AsideNav from '@/components/AsideNav/index'
import Header from '@/components/Header'
import { NavigationOption } from '@/utils/consts'
import DocumentsUploadPanel from '@/pages/DocumentsUploadPanel'
import VariablesAnnotationPanel from '@/pages/VariablesAnnotationPanel'

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(
    NavigationOption.DOCUMENTS.title
  )

  const componentMap: Record<string, React.ReactNode> = {
    [NavigationOption.DOCUMENTS.title]: (
      <DocumentsUploadPanel onSwitch={setSelectedOption} />
    ),
    [NavigationOption.VARIABLES.title]: (
      <VariablesAnnotationPanel
        onSwitch={setSelectedOption}
      />
    ),
    [NavigationOption.PARAMETERS.title]: (
      <VariablesAnnotationPanel
        onSwitch={setSelectedOption}
      />
    )
  }

  return (
    <>
      <Header></Header>
      <div style={{ display: 'flex' }}>
        <AsideNav
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></AsideNav>
        <main>
          <div className='content-wrapper flex min-h-full min-w-[85vw] items-center justify-center bg-gray-200'>
            {componentMap[selectedOption]}
          </div>
        </main>
      </div>
    </>
  )
}
