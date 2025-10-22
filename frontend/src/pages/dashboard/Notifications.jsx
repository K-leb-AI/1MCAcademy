import { NotificationSidebar } from "../../components/notification-sidebar";
import { SidebarProvider } from "../../components/ui/notification-sidebar";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Page() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    mails: [
      {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        message: `Hi team, 

Just a quick reminder about our meeting scheduled for tomorrow at 10 AM in the main conference room. Please come prepared with your project updates, progress metrics, and any blockers you’re currently facing. 

We’ll also discuss next quarter’s roadmap and allocate responsibilities for the upcoming sprint. 

See you all there,  
William`,
      },
      {
        name: "Alice Smith",
        email: "alicesmith@example.com",
        subject: "Re: Project Update",
        date: "Yesterday",
        message: `Hi Shad, 

Thanks for the comprehensive project update you shared. The progress over the past two weeks looks really promising, especially the improvements in user onboarding and UI responsiveness. 

Let’s schedule a quick sync-up call tomorrow afternoon to go through the pending items and define priorities for the next sprint.  

Best,  
Alice`,
      },
      {
        name: "Bob Johnson",
        email: "bobjohnson@example.com",
        subject: "Weekend Plans",
        date: "2 days ago",
        message: `Hey everyone, 

Hope you’re all doing great! I was thinking it might be fun to organize a small team outing this weekend to unwind after our busy release cycle. 

Would you prefer a hiking trip to Aburi Hills or a relaxed beach day at Labadi? Once I get everyone’s responses, I’ll arrange transportation and food.  

Cheers,  
Bob`,
      },
      {
        name: "Emily Davis",
        email: "emilydavis@example.com",
        subject: "Re: Question about Budget",
        date: "2 days ago",
        message: `Hi Shad, 

I’ve reviewed the updated budget numbers you sent. Overall, the distribution looks solid, but I have a few concerns regarding the allocations for marketing and software licenses. 

Can we set up a quick 15-minute call this week to go over the details and ensure we’re aligned before final submission?  

Regards,  
Emily`,
      },
      {
        name: "Michael Wilson",
        email: "michaelwilson@example.com",
        subject: "Important Announcement",
        date: "1 week ago",
        message: `Dear Team, 

Please make sure to join our all-hands meeting this Friday at 3 PM in the main hall (or via Zoom if you’re remote). We have some exciting news to share about the company’s upcoming expansion and a few internal leadership changes. 

Your participation is highly encouraged as we’ll also outline how these developments impact your teams directly.  

Warm regards,  
Michael`,
      },
      {
        name: "Sarah Brown",
        email: "sarahbrown@example.com",
        subject: "Re: Feedback on Proposal",
        date: "1 week ago",
        message: `Hi Shad, 

Thank you for sending over the project proposal. I’ve gone through it carefully and I must say the structure is clear and the objectives are well defined. 

However, I’d like to suggest a few refinements, especially around the implementation timeline and expected deliverables. Could we schedule a meeting tomorrow afternoon to discuss my feedback in detail?  

Kind regards,  
Sarah`,
      },
      {
        name: "David Lee",
        email: "davidlee@example.com",
        subject: "New Project Idea",
        date: "1 week ago",
        message: `Hi Shad, 

I’ve been brainstorming lately and came up with a project idea that could significantly improve user retention. It involves a modular skill-tracking feature that dynamically adapts to each learner’s progress.  

I’d love to share the initial concept with you and get your input on feasibility. Are you available for a short brainstorming session later this week?  

Best,  
David`,
      },
      {
        name: "Olivia Wilson",
        email: "oliviawilson@example.com",
        subject: "Vacation Plans",
        date: "1 week ago",
        message: `Hi Shad, 

Just a heads-up that I’ll be taking a two-week vacation starting next month. I’ve already started handing over my active projects and will ensure everything is documented and up to date before I leave.  

If anything urgent comes up during that time, I’ll check emails occasionally, but I’d appreciate if we could delegate ongoing approvals beforehand.  

Best,  
Olivia`,
      },
      {
        name: "James Martin",
        email: "jamesmartin@example.com",
        subject: "Re: Conference Registration",
        date: "1 week ago",
        message: `Hello Shad, 

I’ve successfully completed the registration for the upcoming Global Tech Conference. I’ve also booked my accommodation and will be flying in a day before the event.  

Let me know if you’d like me to prepare a summary of key sessions that align with our current projects — I can share notes after each day.  

Best regards,  
James`,
      },
      {
        name: "Sophia White",
        email: "sophiawhite@example.com",
        subject: "Team Dinner",
        date: "1 week ago",
        message: `Hey Team, 

To celebrate our recent product launch and the fantastic teamwork behind it, I’d like to organize a team dinner next Friday evening. I was thinking of booking a spot at Skybar25 — they’ve got great food and an amazing view!  

Please let me know if that date works for everyone, and if you have any dietary preferences so I can make the right reservations.  

Cheers,  
Sophia`,
      },
    ],
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
      className="-mt-18 pt-17 flex"
    >
      <NotificationSidebar data={data} />
      <Outlet context={{ data }} />
    </SidebarProvider>
  );
}
