import React, { useEffect } from "react";
import { fetchBackend } from "../../../utils";
import {
    Helmet
  } from "react-helmet";
import MentorCard from "components/mentor/MentorCard";

function Mentors(props) {
    const { eventDetails } = props;

    const [mentors, setMentors] = useState([]);

    useEffect(() => {

        // fetch mentors from backend for given event
        const getMentors = async () => {
            const eventName = eventDetails.eventName;
            const params = new URLSearchParams({
                eventName
            })
            return await fetchBackend(`/registrations?${params}`, "GET");
        }
        
        // save mentors into state
        setMentors(getMentors());

    }, [])

    // TODO @Steven
    // this function will take in a list of skills, you need to look at the mentors state variable
    // and filter out each mentor so that you can return a list of mentors that have at least 
    // one of those skills

    const filterMentorsBySkills = (skills) => {
        
    }

    return (
        <div>
            <Helmet>
                <title>{eventDetails.eventName} Mentors</title>
            </Helmet>
            <Box className="filterComponent">
                
            </Box>
            <Box className="mentorsContainer">
                {
                    mentors.map((mentor) => {
                        return (
                            <MentorCard mentor={mentor} />
                        )
                    })
                }
            </Box>
        </div>
    )
}