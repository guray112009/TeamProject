import "../styles/DiscoverPage.css";
import discoverHero from "../assets/discover_hero.jpg";
import clubsImg from "../assets/clubs.jpg";
import opportunitiesImg from "../assets/opportunities.jpg";
import studyGroupsImg from "../assets/study_groups.jpg";
import networkingImg from "../assets/networking.jpg";
import studentProfessorImg from "../assets/student-professor.jpeg";

export const DiscoverPage = () => {
  const items = [
    {
      title: "Campus Clubs & Activities",
      description:
        "Explore dozens of student-led clubs, from tech to arts, fitness, culture, and more.",
      img: clubsImg,
    },
    {
      title: "Opportunities & Workshops",
      description:
        "Find volunteering opportunities, seminars, guest lectures, and career bootcamps.",
      img: opportunitiesImg,
    },
    {
      title: "Study Groups",
      description:
        "Join a study group or create one to collaborate with classmates.",
      img: studyGroupsImg,
    },
    {
      title: "Networking Events",
      description:
        "Connect with professors, mentors, and industry professionals.",
      img: networkingImg,
    },
    {
      title: "Meet With Faculty",
      description:
        "Build relationships with Centennial professors who support your academic journey.",
      img: studentProfessorImg,
    },
  ];

  return (
    <div className="discover-container">
      {/* HERO */}
      <div
        className="discover-hero"
        style={{ backgroundImage: `url(${discoverHero})` }}
      >
        <h1 className="discover-title">Discover Your Campus</h1>
        <p className="discover-subtitle">
          Explore opportunities that help you grow academically, socially, and
          professionally.
        </p>
      </div>

      {/* CONTENT SECTION */}
      <div className="discover-grid-container">
        <h2 className="discover-section-title">
          What You Can Explore at UniConnect
        </h2>

        <div className="discover-grid">
          {items.map((item, index) => (
            <div className="discover-card" key={index}>
              <img src={item.img} alt={item.title} className="discover-image" />
              <h3 className="discover-card-title">{item.title}</h3>
              <p className="discover-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
