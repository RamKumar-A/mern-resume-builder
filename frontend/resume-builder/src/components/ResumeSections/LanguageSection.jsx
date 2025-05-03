import Progress from '../Progress';

function LanguageSection({ bgColor, accentColor, languages }) {
  return (
    <div className="">
      {languages.map((language, index) => (
        <LanguageInfo
          key={`language_${index}`}
          language={language.name}
          progress={language.progress}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
}

function LanguageInfo({ language, progress, accentColor, bgColor }) {
  return (
    <div className="flex items-center justify-between">
      <p className={`text-[12px] font-semibold text-gray-900`}>{language}</p>
      {progress > 0 && (
        <Progress
          progress={(progress / 100) * 5}
          bgColor={bgColor}
          color={accentColor}
        />
      )}
    </div>
  );
}

export default LanguageSection;
