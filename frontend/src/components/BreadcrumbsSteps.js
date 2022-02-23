import React from 'react';
import { Link } from 'react-router-dom';
import './styles/BreadcrumbsSteps.css';

const BreadcrumbsSteps = ({ currentStep = 'Cart', steps }) => {
  // disable Link for next steps
  const linkHandler = (e, index, path) => {
    if (index > steps.indexOf(steps.find((step) => step.label === currentStep)) && path.length) {
      e.preventDefault();
    }
  };

  return (
    <ul className="breadcrumbs_steps flex">
      {steps.map((step, index) => (
        <li
          className={`step ${
            index < steps.indexOf(steps.find((step) => step.label === currentStep))
              ? 'complete'
              : index > steps.indexOf(steps.find((step) => step.label === currentStep))
              ? ''
              : 'current'
          }`}
        >
          <Link
            to={step?.path.length && step.path}
            onClick={(e) => linkHandler(e, index, step.path)}
          >
            <div className="label">
              {index < steps.indexOf(steps.find((step) => step.label === currentStep))
                ? step?.success || step?.label
                : step?.label}
            </div>
          </Link>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <div href="#" className="dot"></div>
        </li>
      ))}
    </ul>
  );
};

export default BreadcrumbsSteps;
