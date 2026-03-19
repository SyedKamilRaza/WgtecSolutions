import ContactForm from "./ContactForm"; 
import DetailFooter from "./detail_footer"; 
import { detailFooter } from "./detailFooterData"; 

export default function ThankYouSection() {
  return (
    <>
      <DetailFooter data={detailFooter[0]} /> 
      <ContactForm />
    </>
  );
}