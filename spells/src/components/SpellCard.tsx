import { Spell } from "../services/spell"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { CardActionArea } from '@mui/material';

export interface SpellCardProps
{
    spell:Spell;
    increment: number;
    onSelect: () => void | null | undefined;
}
export const SpellCard = (props:SpellCardProps) =>{
    const {spell,increment,onSelect} = props;
    return <div className={`cardInnerWrapper ${increment < 0 ? "previous": increment > 0? "next": ""}`}>

<Card className="spellCard" onClick={onSelect}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={spell.image}
          alt={spell.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {spell.name}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360 }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PlusOneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Level" secondary={spell.level}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SchoolIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="capitalize" primary="School" secondary={spell.school} />
      </ListItem>
     
    </List>

        </CardContent>
      </CardActionArea>
    </Card>

    </div>

    
}