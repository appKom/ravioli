export const EVENT_TYPES = [
  { typeName: "SOCIAL", displayName: "Sosialt", colorName: "green" },
  { typeName: "COMPANY", displayName: "Bedpres", colorName: "red" },
  { typeName: "ACADEMIC", displayName: "Kurs", colorName: "blue" },
  // { typeName: "Utflukt", colorName: "yellow" }, //eksisterer ikke i den nye OW
  // { typeName: "Ekskursjon", colorName: "blue" }, //eksisterer ikke i den nye OW
  { typeName: "INTERNAL", displayName: "Internt", colorName: "red" },
  { typeName: "OTHER", displayName: "Annet", colorName: "purple" },
  // { typeName: "Realfagskjelleren", colorName: "orange" }, //eksisterer ikke i den nye OW
  { typeName: "WELCOME", displayName: "Fadderuke", colorName: "pink"}
];

export type MemeType = {
  id: string;
  name: number;
  author: string;
  authorImage: string;
  date: string;
  url: string;
  type: "image" | "video";
  reactions: {
    name: string;
    count: number;
    url: string;
  }[];
  channelName: string;
};

export type BlastType = {
  id: string;
  name: number;
  author: string;
  authorImage: string;
  date: string;
  text: string;
  channelName: string;
};

export interface IEventImage {
  id: number;
  name: string;
  timestamp: string;
  description: string;
  thumb: string;
  original: string;
  wide: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
  tags: string[];
  photographer: string;
  preset: string;
  preset_display: string;
}
//Fra gammel API. 
// export interface IEvent {
//   id: string;
//   title: string;
//   slug: string;
//   ingress: string;
//   ingress_short: string;
//   description: string;
//   start_date: string; // ISO date string
//   end_date: string; // ISO date string
//   location: string;
//   event_type: number;
//   event_type_display: string;
//   organizer: number;
//   author: number | null;
//   images: IEventImage[];
//   companies: string[];
//   is_attendance_event: boolean;
//   max_capacity: number;
//   waitlist: boolean;
//   number_of_seats_taken: number;
//   attendee_info: string | null;
//   registration_start: string; // ISO date string
//   registration_end: string; // ISO date string
// }

export interface INewEvent {
  id: string;
  status: string;
  type: string;
  title: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  description: string;
  subtitle: string | null;
  imageUrl: string;
  attendanceId?: string | null; 
  attendance?: IEventAttendanceDetails | null;   locationTitle: string | null;
  locationAddress: string | null;
  locationLink: string | null;
  max_capacity: number;
}


export interface IExtraOption {
  id: number;
  choice: string;
  note: string | null;
}

export interface IEventAttendanceDetails {
  id: number;
  capacity: number;
  waitlist: boolean;
  attendees: Array<any>;
  pools: Array<any>;
  guest_attendance: boolean;
  registerStart: string; // ISO date string
  registerEnd: string; // ISO date string
  unattend_deadline: string; // ISO date string
  automatically_set_marks: boolean;
  rule_bundles: number[];
  number_on_waitlist: number;
  number_of_seats_taken: number;
  has_feedback: boolean;
  has_extras: boolean;
  has_reservation: boolean;
  extras: IExtraOption[];
  payment: number | null;
  feedback: number;
  is_eligible_for_signup: boolean | null;
  is_attendee: boolean | null;
  is_on_waitlist: boolean | null;
  what_place_is_user_on_wait_list: number | null;
}

export interface IBids {
  numberOfDonations: number;
  highestGoal: {
    id: string;
    goal: number;
    description: string;
  };
  totalCollected: {
    _sum: {
      amount: number | null;
    };
  };
}