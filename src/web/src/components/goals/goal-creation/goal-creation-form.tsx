import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { z } from 'zod';

const goalFormSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  action: z.string()
    .min(1, 'Please select an action'),
  what: z.string()
    .min(5, 'Description must be at least 5 characters')
    .max(200, 'Description must be less than 200 characters'),
  when: z.date({
    required_error: "Please select a target date",
    invalid_type_error: "Please select a valid date",
  }),
  where: z.string()
    .optional(),
  which: z.string()
    .min(1, 'Please specify the requirements or obstacles')
    .max(200, 'Requirements must be less than 200 characters'),
  why: z.string()
    .min(1, 'Please explain why this goal is important')
    .max(200, 'Reason must be less than 200 characters'),
});

type FormData = z.infer<typeof goalFormSchema>;

const INITIAL_FORM_DATA: FormData = {
  title: '',
  action: '',
  what: '',
  when: new Date(),
  where: '',
  which: '',
  why: '',
};

const ACTIONS = [
  'Oversee',
  'Update',
  'Write',
  'Coordinate',
  'Upgrade',
  'Process',
  'Supervise',
  'Develop',
  'Provide',
  'Manage',
  'Create',
  'Maintain',
  'Plan',
  'Implement',
  'Reconcile',
  'Support',
  'Evaluate',
  'Direct',
  'Transition',
  'Produce',
  'Administer',
];

export const GoalCreationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    title: false,
    action: false,
    what: false,
    when: false,
    where: false,
    which: false,
    why: false,
  });

  const validateField = (field: keyof FormData, value: unknown): string | undefined => {
    try {
      const fieldSchema = goalFormSchema.shape[field];
      fieldSchema.parse(value);
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return 'Invalid input';
    }
  };

  const updateFormData = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const stepFields: Record<number, Array<keyof FormData>> = {
      0: ['title'],
      1: ['action'],
      2: ['what'],
      3: ['when'],
      5: ['which'],
      6: ['why'],
    };

    const fieldsToValidate = stepFields[currentStep];
    if (!fieldsToValidate) return true;

    const stepData = Object.fromEntries(
      fieldsToValidate.map(field => [field, formData[field]])
    );

    try {
      const stepSchema = z.object(
        Object.fromEntries(
          fieldsToValidate.map(field => [field, goalFormSchema.shape[field]])
        )
      );
      
      stepSchema.parse(stepData);
      setErrors(prev => {
        const newErrors = { ...prev };
        fieldsToValidate.forEach(field => delete newErrors[field]);
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = Object.fromEntries(
          error.errors.map(err => [err.path[0], err.message])
        );
        setErrors(prev => ({ ...prev, ...newErrors }));
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 6) {
        // Handle goal creation here
        console.log('Goal created:', formData);
        return;
      }
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const renderError = (error?: string) => {
    if (!error) return null;
    return <p className="text-red-500 text-sm mt-1">{error}</p>;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">Write the goal you have in mind.</p>
            <p className="text-gray-600">This will allow us to easily move on to further analysis.</p>
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
                className={`w-full p-2 border rounded-md ${
                  touched.title && errors.title ? 'border-red-500' : ''
                }`}
                placeholder="Write an Engineering Thesis"
                required
              />
              {touched.title && renderError(errors.title)}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">Now, we will use a formula to make your goal more specific.</p>
            <div className="space-y-2">
              <label htmlFor="action" className="block font-medium">
                Action <span className="text-red-500">*</span>
              </label>
              <select
                id="action"
                value={formData.action}
                onChange={(e) => updateFormData('action', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, action: true }))}
                className={`w-full p-2 border rounded-md ${
                  touched.action && errors.action ? 'border-red-500' : ''
                }`}
                required
              >
                <option value="">Select an action that suits your goal</option>
                {ACTIONS.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
              {touched.action && renderError(errors.action)}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} [when] [where] [which] [why].
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">Think about exactly what you are trying to accomplish.</p>
            <div className="space-y-2">
              <label htmlFor="what" className="block font-medium">
                What <span className="text-red-500">*</span>
              </label>
              <input
                id="what"
                type="text"
                value={formData.what}
                onChange={(e) => updateFormData('what', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, what: true }))}
                className={`w-full p-2 border rounded-md ${
                  touched.what && errors.what ? 'border-red-500' : ''
                }`}
                placeholder="an Engineering Thesis in Computer Science"
                required
              />
              {touched.what && renderError(errors.what)}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} [when] [where] [which] [why].
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">You should at least set a time frame.</p>
            <div className="space-y-2">
              <label htmlFor="when" className="block font-medium">
                When <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center space-y-4">
                <Calendar
                  mode="single"
                  selected={formData.when}
                  onSelect={(date) => date && updateFormData('when', date)}
                  className="rounded-md border"
                  disabled={{ before: new Date() }}
                />
                {touched.when && renderError(errors.when)}
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} by {formData.when ? format(formData.when, 'MMMM d, yyyy') : '[when]'} {formData.where} [which] [why].
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">If there's a location or relevant event, identify it here.</p>
            <div className="space-y-2">
              <label htmlFor="where" className="block font-medium">
                Where
              </label>
              <input
                id="where"
                type="text"
                value={formData.where}
                onChange={(e) => updateFormData('where', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="in the comfort of my home"
              />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} by {formData.when ? format(formData.when, 'MMMM d, yyyy') : '[when]'} {formData.where} [which] [why].
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">Determine any related obstacles or requirements.</p>
            <p className="text-gray-600">This question can be beneficial in deciding if your goal is realistic.</p>
            <div className="space-y-2">
              <label htmlFor="which" className="block font-medium">
                Which <span className="text-red-500">*</span>
              </label>
              <input
                id="which"
                type="text"
                value={formData.which}
                onChange={(e) => updateFormData('which', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, which: true }))}
                className={`w-full p-2 border rounded-md ${
                  touched.which && errors.which ? 'border-red-500' : ''
                }`}
                placeholder="which will require knowledge about..."
                required
              />
              {touched.which && renderError(errors.which)}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} by {formData.when ? format(formData.when, 'MMMM d, yyyy') : '[when]'} {formData.where} {formData.which} [why].
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a goal</h2>
            <p className="text-gray-600">What is the reason for the goal?</p>
            <div className="space-y-2">
              <label htmlFor="why" className="block font-medium">
                Why <span className="text-red-500">*</span>
              </label>
              <input
                id="why"
                type="text"
                value={formData.why}
                onChange={(e) => updateFormData('why', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, why: true }))}
                className={`w-full p-2 border rounded-md ${
                  touched.why && errors.why ? 'border-red-500' : ''
                }`}
                placeholder="because completing this goal will..."
                required
              />
              {touched.why && renderError(errors.why)}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="text-sm text-gray-600">Title: </span>
                <span className="text-sm font-medium">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-sm font-medium">
                I will {formData.action.toLowerCase()} {formData.what} by {formData.when ? format(formData.when, 'MMMM d, yyyy') : '[when]'} {formData.where} {formData.which} {formData.why}.
              </p>
            </div>
          </div>
        );
    }
  };

  const isLastStep = step === 6;

  return (
    <div className="w-full h-full flex flex-col">
      <form className="flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {renderStep()}
        </div>
        <div className="flex justify-between px-6 py-4 border-t">
          {step > 0 && (
            <Button type="button" variant="primaryOutline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={handleNext}
            className={step === 0 ? 'ml-auto' : ''}
          >
            {isLastStep ? 'Create a goal' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}; 