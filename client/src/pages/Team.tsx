import React from "react";
import { useForm } from "react-hook-form";

const TeamPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateTeam = (data: any) => {
    // Implement your logic to create a team here
    console.log("Create Team:", data);
  };

  const handleUpdateTeam = (data: any) => {
    // Implement your logic to update a team here
    console.log("Update Team:", data);
  };

  const handleAddMember = (data: any) => {
    // Implement your logic to add a member to a team here
    console.log("Add Member:", data);
  };

  const handleDeleteMember = (data: any) => {
    // Implement your logic to delete a member from a team here
    console.log("Delete Member:", data);
  };

  const handleDeleteTeam = (data: any) => {
    // Implement your logic to delete a team here
    console.log("Delete Team:", data);
  };

  return (
    <div>
      <h2>Team Page</h2>

      <form onSubmit={handleSubmit(handleCreateTeam)}>
        <h3>Create Team</h3>
        <div>
          <label>Team Name:</label>
          <input type="text" {...register("teamName", { required: true })} />
          {errors.teamName && <span>Team Name is required</span>}
        </div>
        <button type="submit">Create</button>
      </form>

      <form onSubmit={handleSubmit(handleUpdateTeam)}>
        <h3>Update Team</h3>
        <div>
          <label>Team ID:</label>
          <input type="text" {...register("teamId", { required: true })} />
          {errors.teamId && <span>Team ID is required</span>}
        </div>
        <div>
          <label>New Name:</label>
          <input type="text" {...register("newName", { required: true })} />
          {errors.newName && <span>New Name is required</span>}
        </div>
        <button type="submit">Update</button>
      </form>

      <form onSubmit={handleSubmit(handleAddMember)}>
        <h3>Add Member</h3>
        <div>
          <label>Team ID:</label>
          <input type="text" {...register("teamId", { required: true })} />
          {errors.teamId && <span>Team ID is required</span>}
        </div>
        <div>
          <label>Member Name:</label>
          <input type="text" {...register("memberName", { required: true })} />
          {errors.memberName && <span>Member Name is required</span>}
        </div>
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleSubmit(handleDeleteMember)}>
        <h3>Delete Member</h3>
        <div>
          <label>Team ID:</label>
          <input type="text" {...register("teamId", { required: true })} />
          {errors.teamId && <span>Team ID is required</span>}
        </div>
        <div>
          <label>Member ID:</label>
          <input type="text" {...register("memberId", { required: true })} />
          {errors.memberId && <span>Member ID is required</span>}
        </div>
        <button type="submit">Delete</button>
      </form>

      <form onSubmit={handleSubmit(handleDeleteTeam)}>
        <h3>Delete Team</h3>
        <div>
          <label>Team ID:</label>
          <input type="text" {...register("teamId", { required: true })} />
          {errors.teamId && <span>Team ID is required</span>}
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default TeamPage;
