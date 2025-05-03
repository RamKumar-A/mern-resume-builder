import Input from '../../../components/Inputs/Input';

function ContactInfoForm({ contactInfo, updateSection }) {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Contact Information
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            label="Address"
            placeholder="Short Address"
            type="text"
            value={contactInfo.location || ''}
            onChange={(e) => updateSection('location', e.target.value)}
          />
        </div>
        <Input
          label="Email"
          placeholder="john@example.com"
          type="email"
          value={contactInfo.email || ''}
          onChange={(e) => updateSection('email', e.target.value)}
        />
        <Input
          label="Phone Number"
          placeholder="9999999999"
          type="text"
          value={contactInfo.phone || ''}
          onChange={(e) => updateSection('phone', e.target.value)}
        />
        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          type="text"
          value={contactInfo.linkedin || ''}
          onChange={(e) => updateSection('linkedin', e.target.value)}
        />
        <Input
          label="GitHub"
          placeholder="https://github.com/in/username"
          type="text"
          value={contactInfo.github || ''}
          onChange={(e) => updateSection('github', e.target.value)}
        />
        <div className="md:col-span-2">
          <Input
            label="Portfolio / Website"
            placeholder="https://yourwebsite.com"
            type="text"
            value={contactInfo.website || ''}
            onChange={(e) => updateSection('website', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactInfoForm;
