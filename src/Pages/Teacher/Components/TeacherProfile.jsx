import React from 'react';
import { DialogContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import '../css/style.css'

const TeacherProfile = ({ teacher }) => {
  return (
    <div>
      <DialogContent>
        <Typography variant="body1" className="mb-2 text-xl">{teacher.email ? `Email: ${teacher.email}` : ``}</Typography>
        <Typography variant="body1" className="mb-2 text-m">{teacher.contact ? `Contact: ${teacher.contact}` : ``}</Typography>
        <Typography variant="body1" className="mb-2 text-m">{teacher.address ? `Address: ${teacher.address}` : ``}</Typography>
        <Typography variant="body1" className="mb-2 text-m">Subjects:</Typography>
        <List>
          {teacher.subjects?.map((subject, index) => (
            <ListItem key={index}>
              <ListItemText primary={subject} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </div>
  );
};

export default TeacherProfile;