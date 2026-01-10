import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  bookingType: string;
  itemName: string;
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  specialRequests?: string;
}

interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface NewsletterEmailData {
  email: string;
}

interface VolunteerApplicationEmailData {
  programTitle: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  preferredStartDate: string;
  duration: string;
  experience?: string;
  motivation?: string;
}

export async function sendBookingNotification(data: BookingEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'Accommodation Collection <noreply@accommodations.guide>',
      to: 'reservations@accommodations.guide',
      subject: `New Booking Request: ${data.itemName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Booking Type:</strong> ${data.bookingType}</p>
        <p><strong>Item:</strong> ${data.itemName}</p>
        <hr />
        <h3>Guest Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <hr />
        <h3>Stay Details</h3>
        <p><strong>Check-in:</strong> ${data.checkInDate}</p>
        <p><strong>Check-out:</strong> ${data.checkOutDate}</p>
        <p><strong>Number of Days:</strong> ${data.numberOfDays}</p>
        <p><strong>Adults (15 years and Above):</strong> ${data.adults}</p>
        <p><strong>Children (Below 15 years):</strong> ${data.children}</p>
        ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
        <hr />
        <p><em>This email was sent from the Accommodation Collection website booking form.</em></p>
      `,
    });

    if (error) {
      console.error('Error sending booking email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return false;
  }
}

export async function sendInquiryNotification(data: InquiryEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'Accommodation Collection <noreply@accommodations.guide>',
      to: 'reservations@accommodations.guide',
      subject: `New Inquiry: ${data.subject}`,
      html: `
        <h2>New Inquiry from Contact Form</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <hr />
        <h3>Message</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p>${data.message}</p>
        <hr />
        <p><em>This email was sent from the Accommodation Collection website contact form.</em></p>
      `,
    });

    if (error) {
      console.error('Error sending inquiry email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending inquiry notification:', error);
    return false;
  }
}

export async function sendNewsletterSignup(data: NewsletterEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'Accommodation Collection <noreply@accommodations.guide>',
      to: 'info@accommodations.guide',
      subject: `New Newsletter Subscription: ${data.email}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr />
        <p><em>This email was sent from the Accommodation Collection website newsletter signup.</em></p>
      `,
    });

    if (error) {
      console.error('Error sending newsletter signup email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending newsletter signup:', error);
    return false;
  }
}

export async function sendVolunteerApplicationNotification(data: VolunteerApplicationEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'Accommodation Collection <noreply@accommodations.guide>',
      to: 'info@accommodations.guide',
      subject: `New Volunteer Application: ${data.programTitle}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Program:</strong> ${data.programTitle}</p>
        <hr />
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Nationality:</strong> ${data.nationality}</p>
        <hr />
        <h3>Program Details</h3>
        <p><strong>Preferred Start Date:</strong> ${data.preferredStartDate}</p>
        <p><strong>Duration:</strong> ${data.duration}</p>
        ${data.experience ? `<p><strong>Relevant Experience:</strong> ${data.experience}</p>` : ''}
        ${data.motivation ? `<p><strong>Motivation:</strong> ${data.motivation}</p>` : ''}
        <hr />
        <p><em>This email was sent from the Accommodation Collection website volunteer application form.</em></p>
      `,
    });

    if (error) {
      console.error('Error sending volunteer application email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending volunteer application notification:', error);
    return false;
  }
}
