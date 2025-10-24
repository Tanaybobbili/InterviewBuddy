import OrgList from '../details/organisation/OrgList';
import {useState} from 'react';
import AddOrg from '../details/organisation/AddOrg';
import Button from '../components/Button';


export default function Organizations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  function handleAddOrgSuccess() {
    setRefreshFlag(flag => !flag); 
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Organizations</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Organization</Button>
      </div>
      {isModalOpen && (
        <AddOrg
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddOrgSuccess}
        />
      )}
      <OrgList key={refreshFlag} />
    </div>
  );
}
