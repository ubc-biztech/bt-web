import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  List,
  ListItem,
  Button
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: "linear-gradient(135deg, #3C1F62, #5A3D89, #2F3C53, #121C2C)",
              minHeight: "100vh",
              margin: 0,
            },
          },
        },
    },
  palette: {
    primary: {
      main: "#8b5cf6"
    },
    secondary: {
      main: "#6366f1"
    }
  },
});

function Leaderboard({ teams: initialTeams }) {
  const [teams, setTeams] = useState(initialTeams);

  const updateRandomTeams = () => {
    setTeams((prevTeams) => {
      const newTeams = [...prevTeams];
      const indices = new Set();
      while (indices.size < 2) {
        indices.add(Math.floor(Math.random() * newTeams.length));
      }

      indices.forEach((index) => {
        newTeams[index] = {
          ...newTeams[index],
          score: Math.floor(Math.random() * 150)
        };
      });

      return newTeams.sort((a, b) => b.score - a.score);
    });
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <EmojiEventsIcon sx={{ color: "#FFD700" }} />;
      case 1:
        return <MilitaryTechIcon sx={{ color: "#C0C0C0" }} />;
      case 2:
        return <WorkspacePremiumIcon sx={{ color: "#CD7F32" }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to right, #8b5cf6, #6366f1)",
          p: 2.5
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          Leaderboard
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        <AnimatePresence>
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
                mass: 1
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  py: 1.5
                }}
              >
                <Box
                  component={motion.div}
                  layout
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    bgcolor: "action.hover",
                    borderRadius: "50%",
                    mr: 1.5,
                    fontWeight: "bold",
                    color: "text.secondary"
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.1 }}
                    >
                      {getRankIcon(index) || index + 1}
                    </motion.div>
                  </AnimatePresence>
                </Box>
                <Typography
                  component={motion.span}
                  layout
                  variant="body1"
                  sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    color: "text.primary"
                  }}
                >
                  {team.name}
                </Typography>
                <Typography
                  component={motion.span}
                  layout
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {team.score}
                </Typography>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={updateRandomTeams}>
          Update Random Teams
        </Button>
      </Box>
    </Box>
  );
}

function GlobalLeaderboardExample() {
    const initialTeams = [
        { id: "1", name: "Team Alpha", score: 100 },
        { id: "2", name: "Team Beta", score: 85 },
        { id: "3", name: "Team Gamma", score: 95 },
        { id: "4", name: "Team Delta", score: 70 },
        { id: "5", name: "Team Epsilon", score: 110 },
        { id: "6", name: "Team Zeta", score: 90 },
        { id: "7", name: "Team Eta", score: 75 },
        { id: "8", name: "Team Theta", score: 105 },
        { id: "9", name: "Team Iota", score: 80 },
        { id: "10", name: "Team Omega", score: 95 },
    ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Leaderboard teams={initialTeams} />
      </Box>
    </ThemeProvider>
  );
}

function LocalLeaderboardExample() {
    const initialTeams = [
        { id: "1", name: "Team Alpha", score: 100 },
        { id: "2", name: "Team Beta", score: 85 },
        { id: "3", name: "Team Gamma", score: 95 },
        { id: "4", name: "Team Delta", score: 70 },
        { id: "5", name: "Team Epsilon", score: 110 },
        { id: "6", name: "Team Zeta", score: 90 },
        { id: "7", name: "Team Eta", score: 75 },
        { id: "8", name: "Team Theta", score: 105 },
        { id: "9", name: "Team Iota", score: 80 },
        { id: "10", name: "Team Omega", score: 95 },
    ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Leaderboard teams={initialTeams} />
      </Box>
    </ThemeProvider>
  );
}

export { GlobalLeaderboardExample, LocalLeaderboardExample };