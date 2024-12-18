import React, { useEffect, useState, useContext } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';
import 'react-vertical-timeline-component/style.min.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container" style={{ background: theme.timelineColor }}>
            <Container>
              <VerticalTimeline lineColor={theme.color} className="experience">
                {data.map((item) => (
                  <Fade key={item.title + item.dateText}>
                    <VerticalTimelineElement
                      date={item.dateText}
                      dateClassName="vertical-timeline-date"
                      iconStyle={{ background: theme.accentColor, color: theme.cardBackground }}
                      contentStyle={{ color: theme.color, backgroundColor: theme.cardBackground }}
                      contentArrowStyle={{ borderRight: `7px solid ${theme.cardBackground}` }}
                      style={styles.itemStyle}
                      className="vertical-timeline-element--work"
                    >
                      <h2 className="item-title vertical-timeline-element-title" style={{ color: theme.color }}>{item.title.toUpperCase()}</h2>
                      <div style={styles.subtitleContainerStyle}>
                        <h4 className="vertical-timeline-element-subtitle" style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                          <h5 style={styles.inlineChild}>
                            &nbsp;
                            &nbsp;
                            {item.workType}
                          </h5>
                        )}
                      </div>
                      <p>{item.workDescription}</p>
                    </VerticalTimelineElement>
                  </Fade>
                ))}
              </VerticalTimeline>
            </Container>
          </div>
        ) : <FallbackSpinner />}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
