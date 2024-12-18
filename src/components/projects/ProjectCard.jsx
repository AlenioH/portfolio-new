import React, { useContext } from 'react';
import {
  Button, Card, Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
    height: '100%',
    display: 'grid',
    gridTemplateRows: '300px 25% 3.5rem auto',
    gap: '0.5rem',
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  imgStyle: {
    height: '300px',
    aspectRatio: '1/1',
    objectFit: 'cover',
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Card
      style={{
        ...styles.cardStyle,
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorderColor,
      }}
      text={theme.bsSecondaryVariant}
    >
      <Card.Img variant="top" src={project?.image} style={styles.imgStyle} />
      <Card.Body>
        <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
        <Card.Text style={styles.cardTextStyle}>
          {parseBodyText(project.bodyText)}
        </Card.Text>
      </Card.Body>

      <Card.Body>
        {project?.links?.map((link) => (
          <Button
            key={link.href}
            style={styles.buttonStyle}
            variant={'outline-' + theme.bsSecondaryVariant}
            onClick={() => window.open(link.href, '_blank')}
          >
            {link.text}
          </Button>
        ))}
      </Card.Body>
      {project.tags && (
        <Card.Footer style={{
          backgroundColor: theme.cardFooterBackground,
          height: 'max-content',
          alignSelf: 'end',
        }}
        >
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              pill
              bg={theme.bsSecondaryVariant}
              text={theme.bsPrimaryVariant}
              style={{
                ...styles.badgeStyle,
                border: tag === 'In Progress' ? '2px solid red' : 'none',
              }}
            >
              {tag}
            </Badge>
          ))}
        </Card.Footer>
      )}
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
