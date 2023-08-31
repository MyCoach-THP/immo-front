import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${propertyId}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Une erreur s\'est produite :', error));
  }, [propertyId]);

  if (!property) {
    return <div className='loading-message'>Chargement en cours...</div>;
  }

  return (
    <div className='secondaryContainer'>
      <h2 className='property-title'>{property.title}</h2>
      <div className='property-image'>
        <img src="../src/assets/preview.avif" alt="Property" />
      </div>
      <div className='property-description'>{property.description}</div>
      <div className='property-price'>Prix : {property.price} €</div>
      <div className='property-owner'>Propriétaire : {property.user.email}</div>
    </div>
  );
};

export default PropertyDetails;