import { useEffect, useRef, useState } from 'react';
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalatte,
} from '../../utils/data';
import Tabs from '../../components/Tabs';
import { LuCircleCheckBig } from 'react-icons/lu';
import TemplateCard from '../../components/Cards/TemplateCard';
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import { Box, Button, Grid, Stack } from '@mui/material';

const TAB_DATA = [{ label: 'Templates' }, { label: 'Color Palattes' }];

function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState('Templates');

  const [selectedColorPalatte, setSelectedColorPalatte] = useState({
    colors: selectedTheme?.theme || '',
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || '',
    index: -1,
  });

  // Handle Theme Change
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalatte: selectedColorPalatte?.colors,
      theme: selectedTemplate.theme,
    });
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener('resize', updateBaseWidth);

    return () => {
      window.removeEventListener('resize', updateBaseWidth);
    };
  }, []);

  return (
    <Box mx="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt="0.5rem"
        mb="1.25rem"
        flexWrap="wrap"
      >
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        <Button
          sx={{
            color: '#6e11b0',
            bgcolor: '#9810fa21',
            textTransform: 'capitalize',
          }}
          size="small"
          onClick={() => handleThemeSelection()}
          startIcon={<LuCircleCheckBig className="" />}
        >
          Done
        </Button>
      </Stack>
      <Grid container spacing="1.25rem">
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid
            container
            spacing="1.25rem"
            mx="auto"
            columns={{ xs: 4, sm: 8 }}
            overflow="auto"
          >
            {tabValue === 'Templates' &&
              resumeTemplates.map((template, index) => (
                <Grid size={{ xs: 4, sm: 4 }} key={`templates_${index}`}>
                  <TemplateCard
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate?.index === index}
                    onSelect={() =>
                      setSelectedTemplate({ theme: template.id, index })
                    }
                  />
                </Grid>
              ))}
            {tabValue === 'Color Palattes' &&
              themeColorPalatte.themeOne.map((colors, index) => (
                <Grid size={{ xs: 2 }} key={`palatte_${index}`}>
                  <ColorPalatte
                    colors={colors}
                    isSelected={selectedColorPalatte?.index === index}
                    onSelect={() => setSelectedColorPalatte({ colors, index })}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }} ref={resumeRef}>
          <RenderResume
            templateId={selectedTemplate?.theme || ''}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalatte={selectedColorPalatte?.colors || []}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function ColorPalatte({ colors, isSelected, onSelect }) {
  return (
    <Stack
      direction="row"
      className={`h-28 bg-purple-50 rounded-lg overflow-hidden border-2 ${
        isSelected ? 'border-purple-500' : 'border-none'
      }`}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          style={{ backgroundColor: color }}
          onClick={onSelect}
          className=" flex-1"
        />
      ))}
    </Stack>
  );
}

export default ThemeSelector;
