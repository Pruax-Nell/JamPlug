import React from 'react';
// Try importing directly from the core
// import type { ObjectFieldProps } from '@keystatic/core'; 

type ImageSchema = {
    src: any;
    alt: any;
    edge: any;
}; 

export const ImagePreview = (props: any) => {
// If ObjectFieldProps still shows a red line, use this "Manual Type"
// It perfectly matches the reference you found earlier!
interface ManualPreviewProps {
  fields: {
    [K in keyof ImageSchema]: { value: ImageSchema[K] };
  };
}

  const { src, alt, edge } = props.fields;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px' }}>
      <div style={{
        width: '50px',
        height: '35px',
        borderRadius: '4px',
        border: `2px solid ${edge.value || '#ccc'}`, 
        overflow: 'hidden',
        backgroundColor: '#f0f0f0'
      }}>
        {src.value ? (
          <img src={src.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#eee' }} />
        )}
      </div>
      <span style={{ fontSize: '14px', fontWeight: 500 }}>
        {alt.value || 'Untitled Image'}
      </span>
    </div>
  );
};