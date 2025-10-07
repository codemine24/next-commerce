import { BoxContainer } from "@/components/box-container";

import { SectionTitle } from "../_components/section-title";

import { CheckoutFormContainer } from "./_components/checkout-form-container";

export default function CheckoutV2() {
    return (
        <BoxContainer>
            <SectionTitle title="Checkout" />
            <CheckoutFormContainer />
        </BoxContainer>
    );
}