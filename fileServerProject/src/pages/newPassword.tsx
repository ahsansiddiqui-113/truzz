import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import btnImage from '../assets/btn.png';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password should be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://mentorloungeuni-69fabc1001d8.herokuapp.com/users/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        navigate('/dashboard'); 
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#D8D8D8] flex justify-center items-center h-screen transition-all'>
      <div className='bg-[#00FF6633] flex flex-col items-center gap-9 p-14 w-[500px] rounded-[20px] transition-all border border-[#000]'>
        <div>
          <h1 className='text-[36px] font-bold'>Enter new Password</h1>
        </div>
        <div className='w-full'>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='bg-[#928E26BF] px-5 py-3 w-full text-[#000] placeholder-[#000] font-bold rounded-lg'
          />
        </div>
        <div className='w-full'>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='bg-[#928E26BF] px-5 py-3 w-full text-[#000] placeholder-[#000] font-bold rounded-lg mb-2'
          />
          <div className='flex items-start justify-start w-full'>
            Password should be at least 8 characters long.
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          onClick={handleSubmit}
          className="relative w-[180px] h-[55px] flex justify-center items-center"
          disabled={loading}
        >
          <img src={btnImage} alt="" className="absolute inset-0 w-full" />
          <div className="text-white font-bold text-[18px] z-10">
            {loading ? 'Submitting...' : 'Continue'}
          </div>
        </button>
        <Link to={'/dashboard'}>
          <div className="text-white font-bold text-[18px] mt-4">
            Cancel
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewPassword;
