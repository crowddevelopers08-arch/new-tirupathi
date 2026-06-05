"use client"

import type { ComponentProps } from "react"
import ConsultationFormPopup from "../hair-consultation-popup"

type ConsultationFormPopupProps = ComponentProps<typeof ConsultationFormPopup>

export default function HairTransplantPopup(props: ConsultationFormPopupProps) {
  return <ConsultationFormPopup {...props} formName="hair-transplant" />
}
